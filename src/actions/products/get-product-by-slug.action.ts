"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
    try {
        const product = await prisma.product.findFirst({
            include: {
                ProductImage: true,
                ProductSize: {
                    select: {
                        size: true,
                        inStock: true,
                    }
                }
            },
            where: {
                slug: slug,
            }
        });

        if (!product) return null;

        return {
            ...product,
            images: product.ProductImage.map(image => image.url),
            sizes: product.ProductSize.map((size) => ({
                size: size.size,
                inStock: size.inStock,
            })),
        };

    } catch (error) {
        console.log(error);
        throw new Error(`Error al obtener producto por slug: ${slug}`);
    }
}