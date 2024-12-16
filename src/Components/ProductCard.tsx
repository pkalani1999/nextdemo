import React from "react";
import { Product } from "../Components/Types/Product";

interface ProductCardProps {
    product: Product;
    onDelete: (id: number) => void;
    onEdit: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onEdit }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-80 m-4">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.title}
                </h3>

                <p className="text-sm text-gray-500">
                    <span className="font-medium">Brand:</span> {product.brand}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                    <span className="font-medium">Category:</span> {product.category}
                </p>

                <p className="text-xl font-bold text-blue-600 mb-2">
                    ${product.price.toFixed(2)}
                </p>

                <p className="text-sm text-yellow-500 font-medium mb-2">
                    ⭐ {product.rating}
                </p>

                <p
                    className={`text-sm font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
                >
                    {product.availabilityStatus || "Out of Stock"}
                </p>

                <div className="flex justify-between mt-4">
                    <button onClick={() => onEdit(product)} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md">
                        Edit
                    </button>
                    <button onClick={() => onDelete(product.id)} className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
