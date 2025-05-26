'use server';

import { auth } from "@/auth";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

    const session = await auth();
    const userId = session?.user.id;

    //verificar sesion de usuario
    if (!userId) {
        return {
            ok: false,
            message: 'No hay sesión de usuario',
        }
    }

    //console.log({ productIds, address, userId });

    //Obtener la informacion de los productos
    //Nota: recuerden que podemos llevar +2 productos con el mismo id
    const products = await prisma.product.findMany({
        include: {
            ProductSize: {
                where: {
                    OR: productIds.map(p => ({
                        AND: [
                            { size: p.size },
                            { productId: p.productId },
                        ],
                    })),
                },
            },
        },
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    });
    //console.log(products.map(p => p.ProductSize));
    //Calcular los montos // encabezado
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
    //console.log({ itemsInOrder });

    //Los totales de tax, subtotal y total
    const { subTotal, tax, total } = productIds.reduce((totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find(product => product.id === item.productId);

        if (!product) throw new Error(`${item.productId} no existe - 500`);

        const subTotal = product.price * productQuantity;
        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;

    }, { subTotal: 0, tax: 0, total: 0 });

    //console.log({ subTotal, tax, total });
    //Crear la transaccion en bd
    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            //1. Actualizar el stock de los products

            const updatedProductsPromises = products.map(async (product) => {
                //acumular los valores
                if (product.ProductSize.length === 0) throw new Error(`${product.id} no tiene inventario - 500`);

                const updatedProductSizesPromises = product.ProductSize.map(productSize => {
                    const productQuantity = productIds.filter(
                        p => p.productId === productSize.productId
                            && p.size === productSize.size
                    ).reduce((acc, item) => item.quantity + acc, 0);

                    if (productQuantity === 0) throw new Error(`${product.id} - ${productSize.size} no tiene cantidad definida`);

                    return tx.productSize.update({
                        where: {
                            productId_size: {
                                productId: productSize.productId,
                                size: productSize.size,
                            },
                        },
                        data: {
                            //inStock: productSize.inStock - productQuantity //no hacer
                            inStock: {
                                decrement: productQuantity,
                            }
                        }
                    });
                });

                const updatedProductSizes = await Promise.all(updatedProductSizesPromises);
                //Verificar valores negativos en la existencia = no hay stock
                updatedProductSizes.forEach((productSize) => {
                    if (productSize.inStock < 0) {
                        throw new Error(`${product.title} no tiene inventario suficiente - 500`);
                    }
                });
                return products;
            });

            //console.log({ userId, itemsInOrder, subTotal, tax, total });
            // Esperar a que todas las promesas de actualización de stock se resuelvan
            const updatedProducts = await Promise.all(updatedProductsPromises);

            //2. Crear la orden-Encabezado-Detalle
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,

                    OrderItem: {
                        createMany: {
                            data: productIds.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => product.id === p.productId)?.price ?? 0
                            })),
                        }
                    }
                }
            });

            // validar, si uno de los productos en price es 0, lanzar un error
            const productWhitPriceZero = products.find(product => product.price === 0);

            if (productWhitPriceZero) throw new Error(`${productWhitPriceZero.id} Tiene un Precio de 0`);

            //3. Crear la dirección de la orden
            const { country, ...restAddress } = address;
            //console.log({ ...restAddress, country, order });
            //console.log({ ...restAddress });

            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id,
                }
            });

            return {
                order: order,
                updatedProducts: updatedProducts,
                orderAddress: orderAddress,
            }

        });
        return {
            ok: true,
            order: prismaTx.order,
            prismaTx,
        }
    } catch (error: unknown) {
        let message = "";

        if (error instanceof Error) {
            message = error.message;
        }

        return {
            ok: false,
            message: message,
        }
    }
}