// src/components/UpdateMileage.js
import React, { useState } from 'react';
import { getContract } from '../contract';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const UpdateMileage = () => {
    const [vin, setVin] = useState('');
    const [newMileage, setNewMileage] = useState('');
    const [error, setError] = useState(null);
    const [bgColor] = useState('white');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contract = await getContract();
        if (contract) {
            try {
                await contract.updateMileage(vin, parseInt(newMileage));
                alert("Mileage updated successfully!");
                setError(null);
            } catch (err) {
                if (err.message.includes('New Mileage lower than last recorded')) {
                    setError('The provided mileage is lower than the current mileage.');
                } else if (err.message.includes('Vehicle is reported as stolen')) {
                setError('Cannot update mileage for a stolen vehicle.');
                } else {
                setError('Vehicle with VIN ' + vin + ' does not exist');
                }
            }
        }
    };


    return (
        <Container>
            <Box sx={{ mt: 5, backgroundColor: bgColor, p: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>Update Mileage</Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="VIN"
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="New Mileage"
                        value={newMileage}
                        onChange={(e) => setNewMileage(e.target.value)}
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button variant="contained" color="primary" type="submit">Update</Button>
                </form>
            </Box>
        </Container>
    );
};

export default UpdateMileage;
