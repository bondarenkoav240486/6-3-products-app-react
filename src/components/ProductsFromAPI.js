import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, fetchFilteredProducts, fetchProducts, setSort, fetchProductsWithSort } from '../features/productsSlice';

import { Link } from 'react-router-dom';
import { TextField, Grid, Card, CardMedia, CardContent, Typography, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material'; // Додати імпорти тут

import Pagination from './Pagination'; // Імпортуємо компонент пагінації


const ProductsFromAPI = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const currentPage = useSelector((state) => state.products.currentPage);
    const sort = useSelector((state) => state.products.sort);
    const [searchTerm, setSearchTerm] = useState(''); // Стан для збереження введеного тексту
    const [filteredProducts, setFilteredProducts] = useState(products);
    
    // Debouncing search input
    const debounceTimeout = 500;
    let debounceTimer;
    // Оновлюємо продукти при зміні пошукового запиту
    useEffect(() => {
        // Debounce search input
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (searchTerm.trim() === '') {
                setFilteredProducts(products);
            } else {
                const filtered = products.filter(product =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredProducts(filtered);
            }
        }, debounceTimeout);
    }, [searchTerm, products]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const itemsPerPage = 8;

    const [limit, setLimit] = useState(8); // За замовчуванням завантажуємо 8 продуктів
    const [category, setCategory] = useState(''); // Додаємо стан для вибору категорії

    useEffect(() => {
        if (category) {
            dispatch(fetchFilteredProducts(category)); // Викликаємо фільтрацію продуктів за категорією
        }
    }, [dispatch, category]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value); // Оновлюємо стан категорії
    };

    const startIndex = (currentPage - 1) * itemsPerPage;

    // const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
    const currentProducts = filteredProducts.slice(startIndex, startIndex + 8);

    useEffect(() => {
        dispatch(fetchProducts(limit)); // Завантаження продуктів при зміні ліміту

        // dispatch(fetchProducts(limit, sort)); // Завантаження продуктів при зміні ліміту
    }, [dispatch, limit]);

    const handleLoadMore = (count) => {
        setLimit(count);
    };

    const handleSortChange = (event) => {
        dispatch(setSort(event.target.value));
        dispatch(fetchProductsWithSort({ limit: 8, sort: event.target.value })); // Відправляємо новий запит з сортуванням

    };

    if (status === 'loading') {
        return <CircularProgress />;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }


    return (
        <div>
            <h2>Products API List</h2>

            {/* Поле пошуку */}
            <TextField
                label="Search Products"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                    value={category}
                    onChange={handleCategoryChange}
                    label="Category"
                >
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="jewelery">Jewelery</MenuItem>
                    <MenuItem value="men's clothing">Men's Clothing</MenuItem>
                    <MenuItem value="women's clothing">Women's Clothing</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Sort</InputLabel>
                <Select
                    value={sort}
                    onChange={handleSortChange}
                    label="Sort"
                >
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={2}>
                {currentProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.image}
                                alt={product.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ${product.price}
                                </Typography>
                                <Button
                                    component={Link}
                                    to={`/products/${product.id}`}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                >
                                    View Details
                                </Button>
                                {/* Додаємо кнопку для редагування продукту */}
                                <Button
                                    component={Link}
                                    to={`/edit-APIproduct/${product.id}`}
                                    size="small"
                                    variant="outlined"
                                    color="secondary"
                                    style={{ marginLeft: '10px' }}
                                >
                                    Edit
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Кнопки для завантаження різної кількості продуктів */}
            <div style={{ marginTop: '20px' }}>
                <Button onClick={() => handleLoadMore(8)} variant="contained" color="primary">
                    Load 8
                </Button>
                <Button onClick={() => handleLoadMore(16)} variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                    Load 16
                </Button>
                <Button onClick={() => handleLoadMore(120)} variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                    Load All
                </Button>
            </div>

            {/* Кнопка для переходу на сторінку створення продукту */}
            <div style={{ marginTop: '20px' }}>
                <Button
                    component={Link}
                    to="/add-api-product"
                    variant="contained"
                    color="secondary"
                >
                    Створити новий продукт
                </Button>
            </div>
            <Pagination totalItems={products.length} itemsPerPage={itemsPerPage} />

        </div>
    );
};

export default ProductsFromAPI;

