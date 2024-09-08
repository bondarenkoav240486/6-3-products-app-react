import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCreatedProduct } from '../features/productsSlice';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';

const CreatedProducts = () => {
    const dispatch = useDispatch();
    const createdProducts = useSelector((state) => state.products.createdProducts);
    const showPublished = useSelector((state) => state.products.showPublished);

    // Пагінація: стан для поточної сторінки та кількість продуктів на сторінку
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 2;

    // Фільтруємо продукти на основі значення світчера
    const filteredProducts = createdProducts.filter(product => showPublished ? product.published : !product.published);

    // Визначаємо продукти, які потрібно відобразити на поточній сторінці
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Обробка зміни сторінки
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Обробка видалення продукту
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteCreatedProduct(id));
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Published</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentProducts.map((product, index) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.createdAt}</TableCell>
                                <TableCell>{product.published ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={`/edit-product/${product.id}`}
                                        sx={{ ml: 2 }}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Пагінація */}
            <Pagination
                count={Math.ceil(filteredProducts.length / productsPerPage)} // Кількість сторінок
                page={currentPage} // Поточна сторінка
                onChange={handlePageChange} // Обробка зміни сторінки
                color="primary"
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
        </>
    );
};

export default CreatedProducts;
