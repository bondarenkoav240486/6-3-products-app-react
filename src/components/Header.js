import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Products App
                </Typography>
                <Button color="inherit" component={Link} to="/products">Products</Button>
                <Button color="inherit" component={Link} to="/create-product">Create Product</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
