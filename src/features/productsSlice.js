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

// Асинхронний запит для оновлення продукту
export const updateProductById = createAsyncThunk('products/updateProductById', async ({ id, updatedProduct }) => {
    const response = await axios.put(`https://fakestoreapi.com/products/${id}`, updatedProduct);
    return response.data;
});

// Асинхронний запит для видалення продукту
export const deleteProductById = createAsyncThunk('products/deleteProductById', async (id) => {
    await axios.delete(`https://fakestoreapi.com/products/${id}`);
    return id;
});

// Функція для отримання даних з localStorage
const getCreatedProductsFromLocalStorage = () => {
    const savedProducts = localStorage.getItem('createdProducts');
    return savedProducts ? JSON.parse(savedProducts) : [];
};

// Функція для збереження даних в localStorage
const saveCreatedProductsToLocalStorage = (products) => {
    localStorage.setItem('createdProducts', JSON.stringify(products));
};

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        // createdProducts: [], // Продукти, створені через форму
        createdProducts: getCreatedProductsFromLocalStorage(), // Ініціалізація з localStorage

        status: 'idle', // idle, loading, succeeded, failed
        error: null,
        showPublished: true, // Додаємо стан для фільтрації продуктів

    },
    reducers: {
        // Додавання нового продукту до створених продуктів
        addCreatedProduct: (state, action) => {
            state.createdProducts.push(action.payload);
        },
        // Оновлення існуючого продукту
        updateCreatedProduct: (state, action) => {
            const { id, updatedProduct } = action.payload;
            const index = state.createdProducts.findIndex((product) => product.id === id);
            if (index !== -1) {
                state.createdProducts[index] = updatedProduct;
            }
        },
        // Видалення продукту
        // removeCreatedProduct: (state, action) => {
        //     state.createdProducts = state.createdProducts.filter((product) => product.id !== action.payload);
        // },
        deleteProduct: (state, action) => {
            state.createdProducts = state.createdProducts.filter((product) => product.id !== action.payload);
        },

        // Додаємо нову дію для зміни стану світчера
        toggleShowPublished: (state, action) => {
            state.showPublished = action.payload; // Оновлюємо значення світчера в Redux store
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
            })
            .addCase(updateProductById.fulfilled, (state, action) => {
                const { id, updatedProduct } = action.payload;
                const index = state.createdProducts.findIndex(product => product.id === id);
                if (index !== -1) {
                    state.createdProducts[index] = updatedProduct;
                }
            })
            .addCase(deleteProductById.fulfilled, (state, action) => {
                state.createdProducts = state.createdProducts.filter(product => product.id !== action.payload);
            });
    },
});

// Експортуємо наші дії
// export const { addCreatedProduct, updateCreatedProduct, removeCreatedProduct } = productsSlice.actions;
export const { toggleShowPublished, addCreatedProduct, updateProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
