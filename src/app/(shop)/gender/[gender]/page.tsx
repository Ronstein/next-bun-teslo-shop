export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{ gender: string }>;
    searchParams: Promise<{ page?: string }>
}

const labels: Record<string, string> = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
    'unisex': 'todos'
}


export async function generateMetadata(
    { params, }: Props,
    // parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const { gender } = await params;

    // optionally access and extend (rather than replace) parent metadata
    //const previousImages = (await parent).openGraph?.images || []

    return {
        title: `Productos para ${labels[gender]}`,
        description: `Encuentra todos los productos para ${labels[gender]}`,
        openGraph: {
            title: `Productos para ${labels[gender]}`,
            description: `Encuentra todos los productos para ${labels[gender]}`,
        },
    }
}

export default async function GenderByPage({ params, searchParams }: Props) {
    const { gender } = await params;
    const pageParam = await searchParams;

    const page = pageParam.page ? parseInt(pageParam.page) : 1;

    const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender });

    // console.log({ currentPage, totalPages });

    if (products.length === 0) {
        redirect(`/gender/${gender}`);
    }


    // if (id === 'kids') {
    //     notFound();
    // }

    return (
        <>
            <Title
                title={`Artículos para ${labels[gender]}`}
                subTitle={`Encuentra todos los productos para ${labels[gender]}`}
                className="mb-2"
            />

            <ProductGrid
                products={products}
            />

            <Pagination totalPages={totalPages} />
        </>
    );
}