// import { configureStore } from '@reduxjs/toolkit';
// import productsReducer from './features/productsSlice';

// const store = configureStore({
//     reducer: {
//         products: productsReducer,
//     },
// });

// export default store;


// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import productsReducer from './features/productsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
    },
});

export default store;

