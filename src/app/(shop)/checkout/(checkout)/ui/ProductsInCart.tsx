"use client";

import { ProductImage } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);
    //console.log({ productsInCart });

    useEffect(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (!loaded) {
            if (productsInCart.length === 0) redirect('/empty');
        }
    }, [productsInCart])

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
                            <span>
                                {product.productSize.size} - {product.title} ({product.quantity})
                            </span>
                            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
