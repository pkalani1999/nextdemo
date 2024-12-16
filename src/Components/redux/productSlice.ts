import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../Types/Product';

const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetchProducts',
    async () => {
        const response = await axios.get<{ products: Product[] }>(API_URL);
        return response.data.products;
    }
);

export const deleteProduct = createAsyncThunk<number, number>(
    'products/deleteProduct',
    async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);

export const createProduct = createAsyncThunk<Product, Partial<Product>>(
    'products/createProduct',
    async (newProduct) => {
        const response = await axios.post<Product>(API_URL, newProduct);
        return response.data;
    }
);

export const updateProduct = createAsyncThunk<
    Product,
    { id: number; updatedData: Partial<Product> }
>('products/updateProduct', async ({ id, updatedData }) => {
    const response = await axios.put<Product>(`${API_URL}/${id}`, updatedData);
    return response.data;
});

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (product) => product.id !== action.payload
                );
            })

            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    (product) => product.id === action.payload.id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            });
    },
});

export default productSlice.reducer;
