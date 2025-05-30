import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];
    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };

    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
    clearCart: () => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },
            getSummaryInformation: () => {
                const { cart, getTotalItems } = get();
                const subTotal =
                    cart.reduce((subTotal, product) =>
                        (product.quantity * product.price) + subTotal
                        , 0
                    );

                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemsInCart = getTotalItems();
                return {
                    subTotal,
                    tax,
                    total,
                    itemsInCart,
                }
            },
            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
                //console.log(cart);


                //1. Revisar si el producto existe en el carrito con la talla selecionada
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.productSize.size === product.productSize.size)
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }
                //2. Se que el producto existe por talla ... tengo que incrementar
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.productSize.size === product.productSize.size) {
                        const totalQuantity = item.quantity + product.quantity;
                        //console.log(totalQuantity);

                        if (totalQuantity <= product.productSize.inStock) {
                            return { ...item, quantity: item.quantity + product.quantity }
                        } else {
                            return { ...item, quantity: product.productSize.inStock }
                        }
                    }
                    return item;
                });
                set({ cart: updatedCartProducts });
            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.productSize.size === product.productSize.size) {
                        return { ...item, quantity: quantity }
                    }
                    return item;
                });
                set({ cart: updatedCartProducts });
            },
            removeProduct: (product: CartProduct) => {

                const { cart } = get();

                const updatedCartProducts = cart.filter(
                    (item) => item.id !== product.id || item.productSize.size !== product.productSize.size
                );
                set({ cart: updatedCartProducts });
            },
            clearCart: () => {
                set({ cart: [] })
            },
        }),
        {
            name: 'shopping-cart',
            // skipHydration: true,
        })
);