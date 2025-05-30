"use server";

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password),
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        return {
            ok: true,
            user: user,
            message: 'Usuario creado'
        }
    } catch (error: unknown) {
        let message = "";

        if (error instanceof Error) {
            message = error.message;
        }

        return {
            ok: false,
            user: undefined,
            message: `No se pudo crear el usuario, ${message}`,
        }
    }
}