import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Products App
                </Typography>
                <Button color="inherit" component={Link} to="/products">Products</Button>
                <Button color="inherit" component={Link} to="/create-product">Create Product</Button>
                <Button color="inherit" component={Link} to="/create-APIproduct">Create API Product</Button>
                {isAuthenticated
                    ?
                    <Button
                        color="inherit"
                        sx={{
                            backgroundColor: 'red',
                            '&:hover': {
                                backgroundColor: 'darkred'
                            }
                        }}
                        component={Link} to="/protected"
                        // className="protected-button" // клас для кнопки
                    >
                        ProtectedPage
                    </Button>
                    :
                    ''
                }
                <Button color="inherit" component={Link} to="/login">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
