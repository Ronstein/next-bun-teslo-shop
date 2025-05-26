'use server';

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {

    try {
        const newAddress = await createOrReplaceAddress(address, userId);
        const {
            id: __,
            userId: _,
            ...rest
        } = newAddress;

        return {
            ok: true,
            address: rest,
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo grabar la dirección',
        }
    }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {

        const storeAddress = await prisma.userAddress
            .findUnique({
                where: {
                    userId
                }
            });

        const addressToSave = {
            firstName: address.firstName,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            postalCode: address.postalCode,
            phone: address.phone,
            city: address.city,
            countryId: address.country,
            userId: userId,
        }

        //console.log({ addressToSave, storeAddress });
        if (!storeAddress) {
            //console.log('paso', addressToSave);

            const newAddress = await prisma.userAddress
                .create({
                    data: addressToSave,
                });
            return newAddress;
        }

        const updatedAddress = await prisma.userAddress
            .update({
                where: { userId },
                data: addressToSave,
            })

        return updatedAddress;

    } catch (error) {
        console.log(error);
        throw new Error("No se puedo grabar la dirección");
    }
}