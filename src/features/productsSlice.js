import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Асинхронний запит для отримання продуктів з API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (limit) => {
    const response = await axios.get(`/products?limit=${limit}`);
    return response.data;
});

// Асинхронний запит для отримання продукту за ID
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
});

// Асинхронний запит для створення продукту
export const createProduct = createAsyncThunk('products/createProduct', async (product) => {
    const response = await axios.post('https://fakestoreapi.com/products', product);
    return response.data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        createdProducts: [], // Продукти, створені через форму
        status: 'idle', // idle, loading, succeeded, failed
        error: null,
    },
    reducers: {
        // Додавання нового продукту до створених продуктів
        addCreatedProduct: (state, action) => {
            state.createdProducts.push(action.payload);
        },
        // Оновлення існуючого продукту
        updateProduct: (state, action) => {
            const { id, updatedProduct } = action.payload;
            const index = state.createdProducts.findIndex((product) => product.id === id);
            if (index !== -1) {
                state.createdProducts[index] = updatedProduct;
            }
        },
        // Видалення продукту
        deleteProduct: (state, action) => {
            state.createdProducts = state.createdProducts.filter((product) => product.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.createdProducts.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// Експортуємо наші дії
export const { addCreatedProduct, updateProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
