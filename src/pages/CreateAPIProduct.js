// import React, { useState } from 'react';
// import { TextField, Button, FormControlLabel, Checkbox, CircularProgress, Box, Typography } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { addProductAPIToState } from '../features/productsSlice'; // Імпорт екшену

// const CreateProduct = () => {
//     const [product, setProduct] = useState({
//         title: '',
//         price: '',
//         description: '',
//         image: '',
//         category: '',
//         published: false
//     });
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch();

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setProduct({
//             ...product,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!product.title) newErrors.title = 'Title is required';
//         if (!product.price) newErrors.price = 'Price is required';
//         else if (isNaN(product.price) || parseFloat(product.price) <= 0) newErrors.price = 'Price must be a positive number';
//         if (!product.description) newErrors.description = 'Description is required';
//         if (!product.category) newErrors.category = 'Category is required';
//         if (!product.image) newErrors.image = 'Image URL is required';
//         return newErrors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const validationErrors = validateForm();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }

//         setLoading(true);

//         try {
//             const response = await fetch('https://fakestoreapi.com/products', {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     title: product.title,
//                     price: parseFloat(product.price),
//                     description: product.description,
//                     image: product.image,
//                     category: product.category
//                 }),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             const data = await response.json();

//             // Додаємо створений продукт до Redux state
//             dispatch(addProductAPIToState(data));

//             console.log('Product created:', data);
//             alert('Продукт створено і виведено у консоль')
//             // Очищення форми після успішного створення продукту
//             setProduct({
//                 title: '',
//                 price: '',
//                 description: '',
//                 image: '',
//                 category: '',
//             });
//             // Можна перенаправити на список продуктів або показати повідомлення
//         } catch (error) {
//             console.error('Error creating product:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             {/* <h2>Create Product via API</h2> */}
//             {loading && <CircularProgress />}
//             <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
//                 <Typography variant="h4" gutterBottom>
//                     Create Product via API
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         label="Title"
//                         name="title"
//                         value={product.title}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="normal"
//                         error={Boolean(errors.title)}
//                         helperText={errors.title}
//                     />
//                     <TextField
//                         label="Price"
//                         name="price"
//                         type="number"
//                         value={product.price}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="normal"
//                         error={Boolean(errors.price)}
//                         helperText={errors.price}
//                     />
//                     <TextField
//                         label="Description"
//                         name="description"
//                         value={product.description}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="normal"
//                         multiline
//                         rows={4}
//                         error={Boolean(errors.description)}
//                         helperText={errors.description}
//                     />
//                     <TextField
//                         label="Image URL"
//                         name="image"
//                         value={product.image}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="normal"
//                         error={Boolean(errors.image)}
//                         helperText={errors.image}
//                     />
//                     <TextField
//                         label="Category"
//                         name="category"
//                         value={product.category}
//                         onChange={handleChange}
//                         fullWidth
//                         margin="normal"
//                         error={Boolean(errors.category)}
//                         helperText={errors.category}
//                     />
//                     <Button type="submit" variant="contained" color="primary" disabled={loading}>
//                         Add Product
//                     </Button>
//                 </form>
//             </Box>
//         </div>
//     );
// };

// export default CreateProduct;




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
                // console.log(data);
                setSuccess('Продукт успішно створений');
                console.log('Product created:', data);
                alert('API Продукт  створено і виведено у консоль')
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
        <Box
            // sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}
            className="page_with_form"
        >
            <Typography variant="h4" gutterBottom>
                Створити новий продукт API
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
