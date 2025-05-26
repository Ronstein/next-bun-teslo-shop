"use client";

import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import { Category, Gender, Product, ProductImage as ProductWithImage, ProductSize, Size } from "@/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
    product: Partial<Product> & { ProductImage?: ProductWithImage[] };
    categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
    title: string;
    slug: string;
    description: string;
    price: number;
    productSize: ProductSize[];
    tags: string; //camisa,t-shirt
    gender: Gender;
    categoryId: string;

    //todo: images
    images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {

    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const [isDeletedImage, setIsDeletedImage] = useState(false);

    const {
        handleSubmit,
        register,
        // formState: { isValid },
        getValues,
        setValue,
        watch,// Esto hace que renderize algun cambio
    } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product.tags?.join(', '),
            productSize: product.sizes ?? [],
            //todo: images
            images: undefined,
        }
    });

    // const onSizeChanged = (size: string) => {
    //     const sizes = new Set(getValues('productSizes'));
    //     sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    //     setValue('productSizes', Array.from(sizes));
    // }

    const selectedSizes = watch("productSize") || [];

    const onSizeChanged = (size: Size) => {
        const currentSizes = getValues("productSize") || [];
        //console.log(currentSizes);

        const existingSize = currentSizes.find(s => s.size === size);
        // console.log({ existingSize });

        if (existingSize) {
            setValue(
                "productSize",
                currentSizes.filter(s => s.size !== size)
            );
        } else {
            setValue("productSize", [...currentSizes, { size, inStock: 0 }], {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true
            });
        }
    };

    const onStockChanged = (size: string, stock: number) => {
        const updatedSizes = getValues("productSize").map(s =>
            s.size === size ? { ...s, inStock: stock } : s
        );
        setValue("productSize", updatedSizes, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    };

    const onSubmit = async (data: FormInputs) => {
        //console.log({ data });

        setIsSubmit(true);

        const formData = new FormData();

        const { images, ...productToSave } = data;

        if (product.id) {
            formData.append('id', product.id ?? '');
        }
        formData.append('title', productToSave.title);
        formData.append('slug', productToSave.slug);
        formData.append('description', productToSave.description);
        formData.append('price', productToSave.price.toString());
        formData.append('productSize', JSON.stringify(productToSave.productSize)); // ✅ Enviar como JSON string
        formData.append('tags', productToSave.tags);
        formData.append('categoryId', productToSave.categoryId);
        formData.append('gender', productToSave.gender);

        // console.log({ images });
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        const { ok, product: updatedProduct } = await createUpdateProduct(formData);
        // console.log({ ok });
        setIsSubmit(false);

        if (!ok) {
            alert('Producto no se pudo actualizar');
            return;
        }

        router.replace(`/admin/product/${updatedProduct?.slug}`)
    }

    const onDeleteProductImage = async (imageId: number, imageUrl: string) => {
        setIsDeletedImage(true);
        const { ok } = await deleteProductImage(imageId, imageUrl);
        if (!ok) {
            alert('Producto no se pudo eliminar');
            return;
        }
        setIsDeletedImage(false);
    }

    return (
        <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200"
                        {...register('title', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200"
                        {...register('slug', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('description', { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input type="number" className="p-2 border rounded-md bg-gray-200"
                        {...register('price', { required: true, min: 0 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input type="text" className="p-2 border rounded-md bg-gray-200"
                        {...register('tags', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select className="p-2 border rounded-md bg-gray-200"
                        {...register('gender', { required: true })}
                    >
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Categoria</span>
                    <select className="p-2 border rounded-md bg-gray-200"
                        {...register('categoryId', { required: true })}
                    >
                        <option value="">[Seleccione]</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>

                <button
                    className={clsx('w-full', {
                        'btn-primary': !isSubmit,
                        'btn-disabled': isSubmit,
                    })}
                    disabled={isSubmit}
                >
                    Guardar
                </button>
            </div>

            {/* Selector de tallas y fotos */}

            <div className="w-full">
                {/* As checkboxes */}
                <div className="flex flex-col">
                    <span>Tallas</span>
                    <div className="flex flex-wrap gap-2">
                        {sizes.map(size => {
                            const isSelected = selectedSizes.some(s => s.size === size);

                            return (
                                <div key={size} className="flex flex-col items-center">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className={
                                                clsx(
                                                    'p-2 border rounded-md mr-2 transition-all cursor-pointer'
                                                )
                                            }
                                            checked={isSelected}
                                            onChange={() => onSizeChanged(size as Size)}
                                        />
                                        {size}
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Stock"
                                        min={0}
                                        // value={}
                                        className="p-2 border rounded-md bg-gray-200 w-20 text-center"
                                        value={selectedSizes.find(s => s.size === size)?.inStock || 0}
                                        onChange={(e) => onStockChanged(size, Number(e.target.value))}
                                    // {...register(`productSizes.${stockIndex}.inStock`, { required: true, valueAsNumber: true })}
                                    />
                                </div>
                            );
                        })}
                    </div>


                    <div className="flex flex-col mb-2">

                        <span>Fotos</span>
                        <input
                            type="file"
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                            {...register('images')}
                        />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {
                            product.ProductImage?.map(image => (
                                <div key={image.id}>
                                    <ProductImage
                                        alt={product.title ?? ''}
                                        src={image.url}
                                        width={300}
                                        height={300}
                                        className="rounded-t shadow-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onDeleteProductImage(image.id, image.url)}
                                        className={clsx('w-full rounded-b-xl', {
                                            'btn-danger': !isDeletedImage,
                                            'btn-disabled': isDeletedImage,
                                        })}
                                        disabled={isDeletedImage}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </form>
    );
};