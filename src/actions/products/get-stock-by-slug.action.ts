"use server"

import prisma from "@/lib/prisma"
// import { sleep } from "@/utils";

export const getStockBySlug = async (slug: string) => {
    try {

        //await sleep(3);

        const stock = await prisma.product.findFirst({
            where: { slug },
            include: {
                ProductSize: {
                    select: {
                        inStock: true,
                    }
                }
            }
        });

        return stock?.ProductSize.reduce((total, item) => total + item.inStock, 0) ?? 0;
    } catch (error: unknown) {
        let message = "";

        if (error instanceof Error) {
            message = error.message;
        }
        throw new Error(`Error al obtener stock por slug ${message}`);

    }
}