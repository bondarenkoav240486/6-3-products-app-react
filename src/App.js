import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import Header from './components/Header';
import Login from './pages/Login';
import ProtectedPage from './pages/ProtectedPage'; // компонент для захищеної сторінки
import CreateAPIProduct from './pages/CreateAPIProduct';
import { useSelector } from 'react-redux';
import EditAPIProduct from './pages/EditAPIProduct';

import './App.css';
import './response.css';



const App = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <Router>
            <Header />
            <div style={{ padding: '20px' }} className='Wrapper'>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/protected"
                        element={
                            isAuthenticated ? <ProtectedPage /> : <Navigate to="/login" replace />
                        }
                    />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/create-product" element={<CreateProduct />} />
                    <Route path="/edit-product/:id" element={<EditProduct />} />
                    <Route path="/create-APIproduct" element={<CreateAPIProduct />} />
                    <Route path="/edit-APIproduct/:id" element={<EditAPIProduct />} />
                    <Route path="/" element={<Products />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
