import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { fetchProductById } from '../features/productsSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) =>
        state.products.products.find((product) => product.id === parseInt(id))
    );
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        if (!product) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id, product]);

    if (status === 'loading') {
        return <CircularProgress />;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h2>Product Details</h2>
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={product.image}
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h4">
                        {product.title}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        ${product.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        Category: {product.category}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        Rating: {product.rating?.rate} / 5 ({product.rating?.count} reviews)
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        {product.description}
                    </Typography>
                    <Button variant="contained" color="primary">
                        Add to Cart
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductDetails;
