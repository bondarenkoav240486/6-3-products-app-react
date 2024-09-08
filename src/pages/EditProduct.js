import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../features/productsSlice'; // Використовуємо дію оновлення продукту
import { Button, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { updateCreatedProduct, deleteCreatedProduct } from '../features/productsSlice'; // Використовуємо дію для видалення

const EditProduct = () => {
    const { id } = useParams(); // Отримуємо ID з URL
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.createdProducts.find((p) => p.id === id));
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        published: false,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                price: product.price,
                description: product.description,
                published: product.published,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteCreatedProduct(id)); // Видаляємо продукт
            navigate('/products'); // Переходимо до списку продуктів
        }
    };
   
    const handleUpdate = () => {
        dispatch(updateCreatedProduct({ id, updatedProduct: formData })); // Оновлюємо продукт за його ID
        navigate('/products'); // Переходимо назад до списку продуктів
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
                type="number"
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
            <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                style={{ marginLeft: '10px' }}
            >
                Delete Product
            </Button>
        </div>
    );
};

export default EditProduct;
