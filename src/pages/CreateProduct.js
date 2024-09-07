import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../features/productsSlice'; // Переконайтесь, що createProduct імплементується правильно
import { TextField, Button, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.products.status);
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    published: false
  });
  const [errors, setErrors] = useState({});

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
    if (isNaN(product.price)) newErrors.price = 'Price must be a number';
    if (!product.description) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(createProduct(product));
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      {status === 'loading' && <CircularProgress />}
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
        <FormControlLabel
          control={
            <Checkbox
              name="published"
              checked={product.published}
              onChange={handleChange}
            />
          }
          label="Published"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
