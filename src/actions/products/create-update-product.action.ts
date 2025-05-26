'use server';

import prisma from '@/lib/prisma';
import { Gender, Product, ProductSize, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');


const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(2))),
    productSize: z.preprocess((val) => {
        if (typeof val === "string") {
            try {
                return JSON.parse(val);
            } catch {
                return [];
            }
        }
        return val;
    }, z.array(z.object({
        size: z.coerce.string(),
        inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(2)))
    }))),
    categoryId: z.string().uuid(),
    tags: z.string(),
    gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
    // console.log({ formData });
    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);

    // console.log(productParsed.success);
    if (!productParsed.success) {
        console.log(productParsed.error);
        return { ok: false }
    }
    console.log(productParsed.data);

    const product = productParsed.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, productSize, ...rest } = product;


    try {
        const prismaTx = await prisma.$transaction(async (tx) => {

            let product: Product;
            const tagsArray = rest.tags.split(',')
                .map(tag => tag.trim().toLowerCase());

            if (id) {
                //actualizar
                // 🔥 1. Actualizar el producto (sin tocar ProductSize aún)
                product = await tx.product.update({
                    where: { id },
                    data: {
                        ...rest,
                        tags: {
                            set: tagsArray,
                        }
                    }
                });

                // 🔥 2. Eliminar tallas anteriores
                await tx.productSize.deleteMany({
                    where: {
                        productId: id
                    }
                });

                // 🔥 3. Insertar nuevas tallas
                await tx.productSize.createMany({
                    data: productSize.map(productSize => ({
                        size: productSize.size as Size,
                        inStock: productSize.inStock,
                        productId: id
                    })) as ProductSize[],
                });


                // console.log({ updatedProduct: product, updatedProductSize: productSize });

            } else {
                //crear
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        tags: {
                            set: tagsArray,
                        }
                    }
                });

                await tx.productSize.createMany({
                    data: productSize.map(productSize => ({
                        size: productSize.size as Size,
                        inStock: productSize.inStock,
                        productId: product.id
                    })) as ProductSize[],
                });
            }

            // console.log({ product });
            //Proceso de carga y guardado de imagenes

            // Recorrer las imagenes y guardarlas
            if (formData.getAll('images')) {
                //[https://url.jpg,https://url.jpg]
                const images = await uploadImages(formData.getAll('images') as File[]);
                // console.log({ images });
                if (!images) {
                    throw new Error("No se pudo cargar las imágenes, rollingback");
                }
                await prisma.productImage.createMany({
                    data: images.map(image => ({
                        url: image!,
                        productId: product.id,
                    }))
                });
            }
            return {
                product,
            }
        });

        //todo: revalidar paths
        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${product.slug}`);
        revalidatePath(`/product/${product.slug}`);

        return {
            ok: true,
            product: prismaTx.product,
        }

    } catch (error: unknown) {

        let message = "";

        if (error instanceof Error) {
            message = error.message;
        }

        return {
            ok: false,
            message: `Revisar los logs, no se pudo actualizar/crear ${message}`,
        }
    }
}

const uploadImages = async (images: File[]) => {
    try {
        const uploadPromises = images.map(async (image) => {
            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');

                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`,
                    { folder: process.env.CLOUDINARY_FOLDER ?? '' }
                )
                    .then(r => r.secure_url);
            } catch (error) {
                console.log(error);
                return null;
            }
        });

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;

    } catch (error) {
        console.log(error);
        return null;
    }
}