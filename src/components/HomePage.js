// src/components/HomePage.js
import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    textAlign: 'center',
                    backgroundColor: '#f0f0f0',
                    padding: '20px',
                    borderRadius: '10px',
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to TrackCAR
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                    {/* Manage and track your vehicle information with ease. */}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/register"
                    sx={{ mt: 3 }}
                >
                    Get Started
                </Button>
            </Box>
        </Container>
    );
};

export default HomePage;
