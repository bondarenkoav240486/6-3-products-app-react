import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import Header from './components/Header';

const App = () => {
    return (
        <Router>
            <Header />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/create-product" element={<CreateProduct />} />
                    <Route path="/edit-product/:id" element={<EditProduct />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
