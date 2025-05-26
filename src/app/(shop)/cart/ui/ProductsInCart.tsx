"use client";

import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);
    //console.log({ productsInCart });

    // useEffect(() => {
    //     setLoaded(true);
    //     if (loaded) {
    //         if (productsInCart.length === 0) redirect('/empty');
    //     }
    // }, [, productsInCart])

    // 1. Se ejecuta al montar el componente
    useEffect(() => {
        setLoaded(true);
    }, []);

    // 2. Reacciona a los cambios en `productsInCart` después de estar cargado
    useEffect(() => {
        if (loaded && productsInCart.length === 0) {
            redirect('/empty');
        }
    }, [loaded, productsInCart]);


    if (!loaded) return <p>Loading...</p>


    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.productSize.size}`} className="flex mb-5">
                        <ProductImage
                            src={product.image}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px',
                            }}
                            alt={product.title}
                            className="mr-5 rounded"
                        />
                        <div>
                            <Link
                                className="hover:underline cursor-pointer"
                                href={`/product/${product.slug}`}
                            >
                                {product.title} - {product.productSize.size}
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={(quantity) => quantity <= product.productSize.inStock && updateProductQuantity(product, quantity)}
                            />
                            <button className="underline mt-3"
                                onClick={() => removeProduct(product)}
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
