import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, toggleShowPublished } from '../features/productsSlice';  
import { Tabs, Tab, Box, Typography, List, ListItem, ListItemText, Button, FormControlLabel, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { deleteCreatedProduct } from '../features/productsSlice';
import ProductsFromAPI from '../components/ProductsFromAPI';
import CreatedProducts from '../components/CreatedProducts';

const Products = () => {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const createdProducts = useSelector((state) => state.products.createdProducts);

    const showPublished = useSelector((state) => state.products.showPublished);  // Отримуємо стан світчера з Redux

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDelete = (id) => {
        if (window.confirm('Ви впевнені, що хочете видалити цей продукт?')) {
            dispatch(deleteCreatedProduct(id));
        }
    };

    const handleSwitchChange = (event) => {
        dispatch(toggleShowPublished(event.target.checked));  // Оновлюємо стан світчера в Redux
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="product tabs">
                <Tab label="Продукти з API" />
                <Tab label="Створені продукти" />
            </Tabs>
             {/* Додаємо світчер для фільтрації продуктів */}
             <FormControlLabel
                control={<Switch checked={showPublished} onChange={handleSwitchChange} />}
                label={showPublished ? 'Показати опубліковані' : 'Показати неопубліковані'}
            />
            <Box sx={{ p: 3 }}>
                {value === 0 && (
                    <ProductsFromAPI />
                )}
                {value === 1 && (
                    <CreatedProducts />
                )}
            </Box>
        </Box>
    );
};

export default Products;
