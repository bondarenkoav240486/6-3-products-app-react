import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../features/productsSlice';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const CreatedProducts = () => {
    const dispatch = useDispatch();
    const createdProducts = useSelector((state) => state.products.createdProducts);
    const showPublished = useSelector((state) => state.products.showPublished); // Отримання стану світчера

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };

    // Фільтруємо продукти на основі значення світчера
    const filteredProducts = createdProducts.filter(product => showPublished ? product.published : !product.published);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Description</TableCell>
                        {/* <TableCell>Category</TableCell> */}
                        {/* <TableCell>Image</TableCell> */}
                        <TableCell>Date</TableCell>
                        <TableCell>Published</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            {/* <TableCell>{product.category}</TableCell> */}
                            {/* <TableCell>
                                <img src={product.image} alt={product.title} style={{ width: '100px' }} />
                            </TableCell> */}
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CreatedProducts;
