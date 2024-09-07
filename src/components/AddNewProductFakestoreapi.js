import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Box, Typography } from '@mui/material';

const AddNewProductFakestoreapi = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('electronic'); // За замовчуванням встановлюємо категорію
    const [image, setImage] = useState('https://i.pravatar.cc');
    const [published, setPublished] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Валідація
        if (!title || !price || !description) {
            setError('Всі поля мають бути заповнені');
            return;
        }

        // Очищуємо повідомлення про помилки та успіх
        setError('');
        setSuccess('');

        // Створюємо новий продукт через API
        fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            body: JSON.stringify({
                title,
                price: parseFloat(price),
                description,
                image,
                category,
                published,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSuccess('Продукт успішно створений');
                // Очищення форми після успіху
                setTitle('');
                setPrice('');
                setDescription('');
                setCategory('electronic');
                setImage('https://i.pravatar.cc');
                setPublished(false);
            })
            .catch((err) => {
                console.error('Error:', err);
                setError('Помилка при створенні продукту');
            });
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Створити новий продукт
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Назва"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Ціна"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Опис"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    required
                />
                <TextField
                    label="Категорія"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="URL зображення"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                        />
                    }
                    label="Опубліковано"
                />
                {error && <Typography color="error">{error}</Typography>}
                {success && <Typography color="primary">{success}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Створити продукт
                </Button>
            </form>
        </Box>
    );
};

export default AddNewProductFakestoreapi;
