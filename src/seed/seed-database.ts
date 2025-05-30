import { initialData } from "./seed";
import prisma from '../lib/prisma'
import { countries } from './seed-countries';
async function main() {
    // 1. Borrar registros previos
    // await Promise.all([
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.productSize.deleteMany(); // Eliminar registros de ProductSize
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();
    // ]);

    const { categories, products, users } = initialData;

    await prisma.user.createMany({
        data: users
    });

    await prisma.country.createMany({
        data: countries,
    })

    // 2 Categorias
    // const categoriesData = categories.map(category => ({
    //     name: category
    // }));
    const categoriesData = categories.map((name) => ({ name }));
    //console.log(categoriesData);
    await prisma.category.createMany({
        data: categoriesData
    });

    //pasar categories a miniscula por lowercase
    const categoriesDB = await prisma.category.findMany();
    //console.log(categoriesDB);
    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>); //primero el texto y luego el id
    //console.log(categoriesMap);

    //productos
    //const { images, type, ...product1 } = products[0];

    // await prisma.product.create({
    //     data: {
    //         ...product1,
    //         categoryId: categoriesMap['shirts']
    //     }
    // })

    for (const product of products) {
        const { images, sizes, type, category, ...rest } = product;
        // Obtener el ID de la categoría correspondiente

        // Crear el producto en la base de datos
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type], // Asignar la categoría correcta
            },
        });

        // Crear las imágenes del producto
        const imagesData = images.map((image) => ({
            url: image,
            productId: dbProduct.id,
        }));
        await prisma.productImage.createMany({
            data: imagesData,
        });

        // Crear los registros de tallas y stock en ProductSize
        const sizesData = sizes.map((size) => ({
            size: size.size,
            inStock: size.inStock,
            productId: dbProduct.id,
        }));
        await prisma.productSize.createMany({
            data: sizesData,
        });
    }


    console.log('Seed ejecutado correctamente');
}


(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();