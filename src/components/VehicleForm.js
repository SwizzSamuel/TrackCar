// src/components/VehicleForm.js
import React, { useState } from 'react';
import { getContract } from '../contract';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const VehicleForm = () => {
    const [vin, setVin] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [odoReading, setOdoReading] = useState('');
    const [colour, setColour] = useState('');
    const [accidentHistory, setAccidentHistory] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [error, setError] = useState(null);
    const [bgColor] = useState('white');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const timestamp = Math.floor(new Date(purchaseDate).getTime() / 1000);
        const contract = await getContract();
        if (contract) {
            try {
                await contract.addVehicle(vin, parseInt(odoReading), parseInt(year), model, colour, accidentHistory, name, address, parseInt(timestamp));
                alert("Vehicle registered successfully!");
                setError(null);
            } catch (err) {
                setError("Vehicle with VIN " + vin + " already exists");
            }
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 5, backgroundColor: bgColor, p: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>Register Vehicle</Typography>
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
                        label="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Odometer Reading"
                        value={odoReading}
                        onChange={(e) => setOdoReading(e.target.value)}
                        type="number"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Colour"
                        value={colour}
                        onChange={(e) => setColour(e.target.value)}
                        type="text"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Accident History"
                        value={accidentHistory}
                        onChange={(e) => setAccidentHistory(e.target.value)}
                        type="text"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Owner Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Owner Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label=""
                        value={purchaseDate}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                        type="date"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button variant="contained" color="primary" type="submit">Register</Button>
                </form>
            </Box>
        </Container>
    );
};

export default VehicleForm;


