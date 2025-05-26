export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function Home({ searchParams }: Props) {

  const pageParam = await searchParams;
  const page = pageParam.page ? parseInt(pageParam.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  // console.log({ currentPage, totalPages });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title
        title="Tienda"
        subTitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages} />
    </>
  );
}
