// src/pages/EditProduct.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, updateProduct, deleteProduct } from '../features/productsSlice';
import { Button, TextField, FormControlLabel, Checkbox } from '@mui/material';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.products.find((p) => p.id === parseInt(id)));
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        published: false,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                published: product.published,
            });
        } else {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id, product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleUpdate = () => {
        dispatch(updateProduct({ id: parseInt(id), updatedProduct: formData }));
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(parseInt(id)));
            navigate('/created-products');
        }
    };

    return (
        <div>
            <h2>Edit Product</h2>
            <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name="published"
                        checked={formData.published}
                        onChange={handleChange}
                    />
                }
                label="Published"
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update Product
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                Delete Product
            </Button>
        </div>
    );
};

export default EditProduct;
