"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProducts,
    deleteProduct,
    createProduct,
    updateProduct,
} from "../Components/redux/productSlice";
import { RootState, AppDispatch } from "../Components/redux/store";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";

interface ProductFormData {
    id?: number;
    title: string;
    price: number;
    brand: string;
    category: string;
    thumbnail: string;
}

const Dashboard: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector(
        (state: RootState) => state.products
    );

    const [isEditMode, setIsEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<ProductFormData | null>(null);

    const [formData, setFormData] = useState<ProductFormData>({
        title: "",
        price: 0,
        brand: "",
        category: "",
        thumbnail: "",
    });


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const openCreateModal = () => {
        setFormData({
            title: "",
            price: 0,
            brand: "",
            category: "",
            thumbnail: "",
        });
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const openUpdateModal = (product: ProductFormData) => {
        setFormData(product);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleSubmit = () => {
        if (isEditMode && formData.id) {
            dispatch(updateProduct({ id: formData.id, updatedData: formData }));
        } else {
            dispatch(createProduct(formData));
        }
        setIsModalOpen(false);
    };

    const handleDelete = (product: ProductFormData) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (productToDelete?.id) {
            dispatch(deleteProduct(productToDelete.id));
        }
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('isAuthenticated');
        router.push('/login');
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Product Manager</h1>
            <div className="flex w-full justify-between">
                <button
                    onClick={openCreateModal}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
                >
                    Create New Product
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-4"
                >
                    Log Out
                </button>
            </div>

            {loading && <p className="text-blue-500">Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onDelete={() => handleDelete(product)}
                        onEdit={() =>
                            openUpdateModal({
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                brand: product.brand,
                                category: product.category,
                                thumbnail: product.thumbnail,
                            })
                        }
                    />
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">
                            {isEditMode ? "Update Product" : "Create Product"}
                        </h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({ ...formData, price: +e.target.value })
                                }
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Brand"
                                value={formData.brand}
                                onChange={(e) =>
                                    setFormData({ ...formData, brand: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Thumbnail URL"
                                value={formData.thumbnail}
                                onChange={(e) =>
                                    setFormData({ ...formData, thumbnail: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                {isEditMode ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this product?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
