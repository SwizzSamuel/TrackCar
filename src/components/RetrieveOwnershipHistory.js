import React, { useState } from 'react';
import { getContract } from '../contract';
import { Box, TextField, Button, Table, Container, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Alert } from '@mui/material';

const RetrieveOwnershipHistory = () => {
    const [vin, setVin] = useState('');
    const [vehicle, setVehicle] = useState([]);
    const [error, setError] = useState(null);
    const [bgColor] = useState('white');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contract = await getContract();
        if (contract) {
            try {
                const ownershipHistory = await contract.displayVehicleOwnershipHistory(vin);
                const formattedHistory = ownershipHistory.map((owner, index) => ({
                    id: index + 1,
                    name: owner.name,
                    address: owner.ownerAddress,
                    purchaseDate: new Date(owner.purchaseDate * 1000).toLocaleDateString(),
                }));
                setVehicle(formattedHistory);
                setError(null);
            } catch (err) {
                setError("Vehicle with VIN " + vin + " does not exist");
                setVehicle(null);
            }
        }
    };

    return (
        <Container>
        <Box sx={{ mt: 5, backgroundColor: bgColor, p: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>Retrieve Ownership History</Typography>
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
                <Button variant="contained" color="primary" type="submit">Retrieve</Button>
            </form>
            {vehicle.length > 0 && (
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Owner Name</TableCell>
                    <TableCell>Owner Address</TableCell>
                    <TableCell>Purchase Date</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {vehicle.map((owner) => (
                    <TableRow key={owner.id}>
                    <TableCell>{owner.id}</TableCell>
                    <TableCell>{owner.name}</TableCell>
                    <TableCell>{owner.address}</TableCell>
                    <TableCell>{owner.purchaseDate}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        )}
        </Box>
    </Container>
  );
};

export default RetrieveOwnershipHistory;

