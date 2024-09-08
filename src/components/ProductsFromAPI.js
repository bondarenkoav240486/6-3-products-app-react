import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSort } from '../features/productsSlice';
import { Link } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, Button, CircularProgress } from '@mui/material';

import Pagination from './Pagination'; // Імпортуємо компонент пагінації


const ProductsFromAPI = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    const currentPage = useSelector((state) => state.products.currentPage);
    const itemsPerPage = 8;

    const [limit, setLimit] = useState(8); // За замовчуванням завантажуємо 8 продуктів

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        dispatch(fetchProducts(limit)); // Завантаження продуктів при зміні ліміту
    }, [dispatch, limit]);

    const handleLoadMore = (count) => {
        setLimit(count);
    };

    if (status === 'loading') {
        return <CircularProgress />;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    

    return (
        <div>
            <h2>Products List</h2>
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
            <Pagination totalItems={products.length} itemsPerPage={itemsPerPage}/>

        </div>
    );
};

export default ProductsFromAPI;

