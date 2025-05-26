import type { ProductSize } from "@/interfaces"
import clsx from "clsx";

interface Props {
    selectedSize?: ProductSize;
    availableSizes: ProductSize[];

    onSizeChanged: (size: ProductSize) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {

    return (
        <div className="my-5">
            <h3 className="font-bold mb-4">Tallas Disponibles</h3>
            <div className="flex">
                {
                    availableSizes.map((productSize) => (
                        <button
                            key={productSize.size}
                            onClick={() => onSizeChanged(productSize)}
                            className={
                                clsx(
                                    "mx-2 hover:underline text-lg",
                                    {
                                        'underline': productSize.size === selectedSize?.size
                                    },
                                    {
                                        'line-through text-gray-400': productSize.inStock === 0,
                                    }
                                )
                            }
                        //disabled={inStock === 0}
                        >
                            {productSize.size}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
