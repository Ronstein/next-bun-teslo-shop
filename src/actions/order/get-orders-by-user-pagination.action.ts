'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number;
}

export const getPaginatedOrdersByUser = async ({
    page = 1,
    take = 12,
}: PaginationOptions) => {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    if (isNaN(Number(take))) take = 12;
    if (take < 12) take = 12;

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado',
        }
    }

    try {

        const orders = await prisma.order.findMany({
            take: take,
            skip: (page - 1) * take,
            where: {
                userId: session.user.id,
            },
            include: {
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        });

        //2. Obtener el total de paginas
        //todo:
        const totalCount = await prisma.order.count({
            where: {
                userId: session.user.id,
            }
        });
        const totalPages = Math.ceil(totalCount / take);

        return {
            ok: true,
            currentPage: page,
            totalPages: totalPages,
            orders: orders,
        }
    } catch (error) {
        console.log(error);
        //throw new Error("No se pudo cargar las ordenes");
        return {
            ok: false,
            message: 'No se pudo cargar las ordenes',
        }
    }
}