export interface Product {
    id: string;
    description: string;
    images?: string[];
    price: number;
    slug: string;
    tags: string[];
    title: string;
    //todo: type: Type;
    gender: Gender;
    sizes: ProductSize[]; // Stock por talla
}

export interface ProductSize {
    size: Size;
    inStock: number;
}

export interface CartProduct {
    id: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    productSize: ProductSize;
    image: string;
}

export interface ProductImage {
    id: number;
    url: string;
    productId: string;
}

export type Gender = 'men' | 'women' | 'kid' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';