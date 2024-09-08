import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';

const CreateProduct = () => {
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
        published: false
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!product.title) newErrors.title = 'Title is required';
        if (!product.price) newErrors.price = 'Price is required';
        else if (isNaN(product.price) || parseFloat(product.price) <= 0) newErrors.price = 'Price must be a positive number';
        if (!product.description) newErrors.description = 'Description is required';
        if (!product.category) newErrors.category = 'Category is required';
        if (!product.image) newErrors.image = 'Image URL is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        setLoading(true);

        try {
            const response = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                body: JSON.stringify({
                    title: product.title,
                    price: parseFloat(product.price),
                    description: product.description,
                    image: product.image,
                    category: product.category
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('Product created:', data);
            alert('Продукт створено і виведено у консоль')
            // Очищення форми після успішного створення продукту
            setProduct({
                title: '',
                price: '',
                description: '',
                image: '',
                category: '',
            });
            // Можна перенаправити на список продуктів або показати повідомлення
        } catch (error) {
            console.error('Error creating product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Product via API</h2>
            {loading && <CircularProgress />}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={product.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.title)}
                    helperText={errors.title}
                />
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.price)}
                    helperText={errors.price}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    error={Boolean(errors.description)}
                    helperText={errors.description}
                />
                <TextField
                    label="Image URL"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.image)}
                    helperText={errors.image}
                />
                <TextField
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.category)}
                    helperText={errors.category}
                />
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    Add Product
                </Button>
            </form>
        </div>
    );
};

export default CreateProduct;
