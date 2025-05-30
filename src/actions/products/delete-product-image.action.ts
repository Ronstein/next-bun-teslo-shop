'use server';

import { v2 as cloudinary } from 'cloudinary';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
    if (!imageUrl.startsWith('http')) {
        return {
            ok: false,
            message: 'No se pueden borrar imágenes de FS',
        }
    }

    const imageName = imageUrl
        .split('/')
        .pop()
        ?.split('.')[0] ?? '';
    const folderWithimageName = `${process.env.CLOUDINARY_FOLDER ?? ''}/${imageName}`
    // console.log(folderWithimageName);

    // console.log({ imageName });
    try {
        await cloudinary.uploader.destroy(folderWithimageName);

        const deletedImage = await prisma.productImage.delete({
            where: {
                id: imageId,
            },
            select: {
                product: {
                    select: {
                        slug: true,
                    }
                }
            }
        });

        //Revalidar Paths
        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${deletedImage.product.slug}`);
        revalidatePath(`/product/${deletedImage.product.slug}`);

        return {
            ok: true,
            message: 'Se ha eliminado existosamente'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo eliminar la imagen'
        }
    }
}