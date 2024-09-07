import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, deleteProduct } from '../features/productsSlice';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector((state) =>
        state.products.createdProducts.find((product) => product.id === parseInt(id))
    );
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setPrice(product.price);
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ id: parseInt(id), updatedProduct: { id, title, price } }));
        navigate('/products'); // Повернутися до списку продуктів після оновлення
    };

    const handleDelete = () => {
        dispatch(deleteProduct(id)); // Видалення продукту
        navigate('/products'); // Повернутися до списку продуктів після видалення
    };

    return (
        <div>
            <h2>Edit Product ID: {id}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" required />
                </div>
                <button type="submit">Update Product</button>
                <button type="button" onClick={handleDelete}>Delete Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
