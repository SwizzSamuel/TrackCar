// src/components/UpdateStolenStatus.js
import React, { useState } from 'react';
import { getContract } from '../contract';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const UpdateStolenStatus = () => {
    const [vin, setVin] = useState('');
    const [error, setError] = useState(null);
    const [bgColor] = useState('white');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contract = await getContract();
        if (contract) {
            try {
                await contract.updateStolenStatus(vin);
                alert("Stolen status updated successfully!");
                setError(null);
            } catch (err) {
                setError("Vehicle with VIN " + vin + " does not exist");
            }
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 5, backgroundColor: bgColor, p: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>Update Stolen Status</Typography>
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
                    <Button variant="contained" color="primary" type="submit">Update</Button>
                </form>
            </Box>
        </Container>
    );
};

export default UpdateStolenStatus;
