import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, FormControlLabel, Checkbox } from '@mui/material';

const EditAPIProduct = () => {
    const { id } = useParams(); // Отримуємо ID з URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
        published: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Завантаження продукту для редагування
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setFormData({
                    title: data.title,
                    price: data.price,
                    description: data.description,
                    image: data.image,
                    category: data.category,
                    published: data.published || false,
                });
            } catch (err) {
                setError('Failed to load product data');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Запит на оновлення продукту через API
    const handleUpdate = async () => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: formData.title,
                    price: parseFloat(formData.price),
                    description: formData.description,
                    image: formData.image, //  передавати зображення та категорію
                    category: formData.category,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log('Updated product:', data);
            alert('Продукт відредаговано і виведено у консоль')
            navigate('/products'); // Переходимо назад до списку продуктів
        } catch (err) {
            setError('Failed to update product');
            console.error(err);
        }
    };

    // Запит на видалення продукту через API
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                console.log('Deleted product:', data);
                alert('Продукт видалено і виведено у консоль')
                navigate('/products'); // Повертаємось до списку продуктів
            } catch (err) {
                setError('Failed to delete product');
                console.error(err);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Edit API Product</h2>
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
            <TextField
                label="Image URL"
                name="image"
                value={formData.image}
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

export default EditAPIProduct;
