// src/components/VehicleList.js
import React, { useState, useEffect } from 'react';
import { getContract } from '../contract';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [bgColor] = useState('white');

    useEffect(() => {
        const fetchVehicles = async () => {
            const contract = await getContract();
            if (contract) {
                const vehicleCount = await contract.getVehicleCount();
                const vehicleArray = [];
                for (let i = 0; i < vehicleCount; i++) {
                    const vehicle = await contract.displayVehicleInformation(i);
                    vehicleArray.push(vehicle);
                }
                setVehicles(vehicleArray);
            }
        };
        fetchVehicles();
    }, []);

    return (
        <Container>
            <Box sx={{ mt: 5, backgroundColor: bgColor, p: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>Registered Vehicles</Typography>
                <List>
                    {vehicles.map((vehicle, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`VIN: ${vehicle[0]}, Model: ${vehicle[2]}, Year: ${vehicle[1]}, Stolen: ${vehicle[3]}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default VehicleList;
