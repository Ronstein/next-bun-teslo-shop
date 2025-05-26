'use server';

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
    try {
        const address = await prisma.userAddress.findUnique({
            where: { userId },
            select: {
                id: false,
                firstName: true,
                lastName: true,
                address: true,
                address2: true,
                postalCode: true,
                phone: true,
                city: true,
                countryId: true,
                userId: true,
            }
        });

        if (!address) return null;
        const { countryId, address2,
            userId: _,
            ...rest } = address;
        return {
            ...rest,
            address2: address2 ? address2 : '',
            country: countryId,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}