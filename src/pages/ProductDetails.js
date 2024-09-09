import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'succeeded', 'failed'
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setStatus('loading');
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
                setStatus('succeeded');
            } catch (error) {
                setError(error.message);
                setStatus('failed');
            }
        };

        fetchProduct();
    }, [id]);

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
        <div className='ProductDetails'>
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
