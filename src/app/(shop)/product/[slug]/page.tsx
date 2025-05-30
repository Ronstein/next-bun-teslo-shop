export const revalidate = 604800; // 7 dias

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params, }: Props,
    // parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const { slug } = await params;

    // fetch data
    const product = await getProductBySlug(slug);

    // optionally access and extend (rather than replace) parent metadata
    //const previousImages = (await parent).openGraph?.images || []

    return {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? '',
            //images: [],//https://misitioweb.com/products/prod-1/image.png
            images: [{
                url: `/products/${product?.images[1]}`
            }],
        },
    }
}

export default async function ProductPage({ params }: Props) {

    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }
    if (product.ProductImage.length === 0) {
        redirect('/');
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Slideshow */}
            <div className="col-span-1 md:col-span-2">
                {/* Mobile SlideShow*/}
                <ProductMobileSlideshow
                    images={product.images}
                    title={product.title}
                    className="block md:hidden"
                />
                {/* Escritorio SlideShow*/}
                <ProductSlideshow
                    images={product.images}
                    title={product.title}
                    className="hidden md:block"
                />
            </div>
            {/* Detalles */}
            <div className="col-span-1 px-5">
                <StockLabel slug={product.slug} />

                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>

                <p className="text-lg mb-5">
                    ${product.price}
                </p>

                <AddToCart product={product} />

                {/* descripcion */}
                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">
                    {product.description}
                </p>
            </div>
        </div>
    );
}