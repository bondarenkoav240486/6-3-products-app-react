import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';
import { v4 as uuidv4 } from 'uuid'; // Імпортуємо функцію для генерації UUID

// Асинхронний запит для отримання продуктів з API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (limit) => {
    const response = await axios.get(`/products?limit=${limit}`);
    return response.data;
});
// Оновлюємо асинхронний запит для отримання продуктів із сортуванням
export const fetchProductsWithSort = createAsyncThunk('products/fetchProductsWithSort', async ({ limit, sort }) => {
    const response = await fetch(`https://fakestoreapi.com/products?sort=${sort}`);
    const data = await response.json();
    return data;
});
export const fetchFilteredProducts = createAsyncThunk('products/fetchFilteredProducts', async (category) => {
    const response = await axios.get(`/products/category/${category}`);
    return response.data;
});




// Функція для отримання даних з localStorage
const getCreatedProductsFromLocalStorage = () => {
    const savedProducts = localStorage.getItem('createdProducts');
    // Додаткова перевірка на null
    if (savedProducts === null) {
        return [];
    }
    if (savedProducts === false) {
        return [];
    }
    try {
        return JSON.parse(savedProducts);
    } catch (error) {
        console.error('Error parsing localStorage item "createdProducts":', error);
        return [];
    }
};


// Функція для збереження даних в localStorage
const saveCreatedProductsToLocalStorage = (products) => {
    localStorage.setItem('createdProducts', JSON.stringify(products));
};

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        createdProducts: getCreatedProductsFromLocalStorage(), // Ініціалізація з localStorage
        status: 'idle', // idle, loading, succeeded, failed
        error: null,
        showPublished: true, // Додаємо стан для фільтрації продуктів
        currentPage: 1,

        sort: 'asc', // Додаємо стан для сортування
    },
    reducers: {
        // Додавання нового продукту з унікальним ID
        addCreatedProduct: (state, action) => {
            const newProduct = { ...action.payload, id: uuidv4() }; // Генеруємо унікальний ID для продукту
            state.createdProducts.push(newProduct);
            saveCreatedProductsToLocalStorage(state.createdProducts); // Збереження в localStorage
        },
        // Оновлення існуючого продукту
        updateCreatedProduct: (state, action) => {
            const { id, updatedProduct } = action.payload;
            const index = state.createdProducts.findIndex((product) => product.id === id); // Знаходимо продукт за його id
            if (index !== -1) {
                state.createdProducts[index] = { ...state.createdProducts[index], ...updatedProduct }; // Оновлюємо продукт
                saveCreatedProductsToLocalStorage(state.createdProducts); // Зберігаємо оновлені продукти в localStorage
            }
        },
        // Видалення продукту
        deleteCreatedProduct: (state, action) => {
            state.createdProducts = state.createdProducts.filter((product) => product.id !== action.payload);
            saveCreatedProductsToLocalStorage(state.createdProducts); // Збереження в localStorage

        },
        // Дію для зміни стану світчера
        toggleShowPublished: (state, action) => {
            state.showPublished = action.payload; // Оновлюємо значення світчера в Redux store
        },
        setPage(state, action) {
            state.currentPage = action.payload;
        },
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload; // Перезаписуємо продукти після пошуку
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
            // Обробляємо випадок, коли використовується запит із сортуванням
            .addCase(fetchProductsWithSort.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsWithSort.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload; // Оновлюємо продукти
            })
            .addCase(fetchProductsWithSort.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Додаємо обробку фільтрованих продуктів
            .addCase(fetchFilteredProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchFilteredProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

// Експортуємо наші дії
// export const { addCreatedProduct, updateCreatedProduct, removeCreatedProduct } = productsSlice.actions;
export const { setProducts, setSort, toggleShowPublished, addCreatedProduct, updateProduct, deleteCreatedProduct, updateCreatedProduct, setPage } = productsSlice.actions;

export default productsSlice.reducer;
