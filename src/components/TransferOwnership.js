import React, { useState } from 'react';
import { getContract } from '../contract';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

const TransferOwnership = () => {
    const [vin, setVin] = useState('');
    const [newOwner, setNewOwner] = useState('');
    const [newOwnerAddress, setNewOwnerAddress] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [error, setError] = useState(null);
    const [bgColor] = useState('white');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const timestamp = Math.floor(new Date(purchaseDate).getTime() / 1000);
        const contract = await getContract();
        if (contract) {
            try {
                await contract.transferOwnership(vin, newOwner, newOwnerAddress, timestamp);
                alert("Ownership transferred successfully!");
                setError(null);
            } catch (err) {
                setError("Vehicle with VIN " + vin + " does not exist");
            }
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 5, backgroundColor: bgColor, p: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>Transfer Ownership</Typography>
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
                        label="New Owner"
                        value={newOwner}
                        onChange={(e) => setNewOwner(e.target.value)}
                        type="text"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="New Owner Address"
                        value={newOwnerAddress}
                        onChange={(e) => setNewOwnerAddress(e.target.value)}
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
                    <Button variant="contained" color="primary" type="submit">Transfer</Button>
                </form>
            </Box>
        </Container>
    );
}

export default TransferOwnership;