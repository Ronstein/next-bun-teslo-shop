'use server';

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: string;
}

export const getPaginatedProductsWithImages = async ({
    page = 1,
    take = 12,
    gender,
}: PaginationOptions) => {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    if (isNaN(Number(take))) take = 12;
    if (take < 12) take = 12;

    try {
        // 1. Obtener los productos
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    select: {
                        url: true,
                    }
                },
                ProductSize: {
                    select: {
                        size: true,
                        inStock: true,
                    }
                }
            },
            where: {
                gender: gender as Gender,
            }
        });
        // console.log({ products });

        //2. Obtener el total de paginas
        //todo:
        const totalCount = await prisma.product.count({
            where: {
                gender: gender as Gender,
            }
        });
        const totalPages = Math.ceil(totalCount / take);
        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url),
                sizes: product.ProductSize.map((size) => ({
                    size: size.size,
                    inStock: size.inStock,
                })),
            }))
        }
    } catch (error) {
        console.log(error);
        throw new Error("No se pudo cargar los producto");

    }
}