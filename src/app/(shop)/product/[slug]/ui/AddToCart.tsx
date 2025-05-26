"use client";

import { SizeSelector, QuantitySelector } from "@/components"
import type { CartProduct, Product, ProductSize } from "@/interfaces"
import { useCartStore } from "@/store";
import clsx from "clsx";
import { useState } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);
    //console.log(product);

    const [size, setSize] = useState<ProductSize | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);
    const stock = product.sizes.reduce((total, item) => total + item.inStock, 0);
    //console.log(GiGunStock);
    const disabled = stock === 0 || !product.images;
    //console.log(disabled);

    const addToCart = () => {
        setPosted(true);
        if (!size) return;
        if (size.inStock === 0) return;
        // console.log({ size, quantity, product });
        //Todo: add to cart
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            productSize: size,
            image: product.images![0],
        }
        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    }

    const onSizeChanged = (productSize: ProductSize) => {
        if (size === productSize) return;
        setSize(productSize);
        setQuantity(1);
    }

    const onQuantityChanged = (quantity: number) => {
        if (!size) return;
        if (quantity <= size.inStock) setQuantity(quantity);
    }

    return (
        <>
            {
                posted && !size && (
                    <span className="mt-2 text-red-600 fade-in">
                        Debe de seleccionar una talla*
                    </span>
                )
            }

            {
                posted && size?.inStock === 0 && (
                    <span className="mt-2 text-red-600 fade-in">
                        Talla no Disponible*
                    </span>
                )
            }

            {/* Selector de tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={(size) => onSizeChanged(size)}
            />
            {/* selector de cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={(quantity) => onQuantityChanged(quantity)}
            />
            {/* Boton */}
            <button className={clsx(
                'my-5',
                {
                    'btn-primary': !disabled,
                    'btn-disabled': disabled,
                }
            )}
                onClick={addToCart}
                disabled={disabled}
            >
                Agregar al Carrito
            </button>
        </>
    )
}
