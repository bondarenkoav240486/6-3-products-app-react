import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import { Link } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, Button, CircularProgress } from '@mui/material';

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const [limit, setLimit] = useState(8); // За замовчуванням завантажуємо 8 продуктів

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
                {products.map((product) => (
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
                <Button onClick={() => handleLoadMore(20)} variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                    Load All
                </Button>
            </div>
        </div>
    );
};

export default Products;
