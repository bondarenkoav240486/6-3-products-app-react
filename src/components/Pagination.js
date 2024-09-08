// src/components/Pagination.js
import React from 'react';
import { Button, Pagination as MuiPagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../features/productsSlice'; // Дію для оновлення поточної сторінки

const Pagination = ({ totalItems, itemsPerPage }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.products.currentPage);

    const handlePageChange = (event, value) => {
        dispatch(setPage(value)); // Оновлюємо поточну сторінку в Redux
    };

    const pageCount = Math.ceil(totalItems / itemsPerPage);
    // const pageCount = Math.floor(totalItems / itemsPerPage);

    return (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <MuiPagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
            />
        </div>
    );
};

export default Pagination;
