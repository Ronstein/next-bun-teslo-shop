'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const setTransacionId = async (orderId: string, transactionId: string) => {

    const session = await auth();
    if (!session?.user) {
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }

    try {

        const order = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                transactionId: transactionId
            },
        });

        if (!order) {
            return {
                ok: false,
                message: `No se encontró una orden con el id: ${orderId} `,
            }
        }

        return {
            ok: true,
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo actualizar la orden',
        }
    }
}