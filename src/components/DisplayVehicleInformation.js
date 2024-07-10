import React, { useState } from 'react';
import { getContract } from '../contract';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { OpenAI } from 'openai';

const DisplayVehicleInformation = () => {
    const [vin, setVin] = useState('');
    const [vehicle, setVehicle] = useState(null);
    const [bgColor, setBgColor] = useState('white');
    const [error, setError] = useState(null);
    const [insights, setInsights] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contract = await getContract();
        if (contract) {
            try {
                const vehicleInfo = await contract.displayVehicleInformation(vin);
                setVehicle(vehicleInfo);
                setBgColor(vehicleInfo[4] ? 'red' : 'white'); // Change background to red if stolen
                setError(null);

                if (!vehicleInfo[4]) {
                    const openai = await new OpenAI({
                        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
                        dangerouslyAllowBrowser: true
                    });

                    // Generate insights using OpenAI
                    const response = await openai.chat.completions.create({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            {
                            "role": "system",
                            "content": `Provide an expose on the ${vehicleInfo[3].toString()} with an odometer reading of ${vehicleInfo[1].toString()}. Discuss the significance of the current mileage and predicted physical state.`
                            }],
                        max_tokens: 300,
                    });

                    setInsights(response.choices[0].message.content.trim());
                } else {
                    setInsights('');
                }
                // Configure OpenAI
            } catch (err) {
                setError("Vehicle with VIN " + vin + " does not exist");
                setVehicle(null);
                setInsights('');
            }
        }
    };

    return (
        <Container>
            <Box sx={{ mt: 5, backgroundColor: bgColor, p: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>Display Vehicle Information</Typography>
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
                    <Button variant="contained" color="primary" type="submit">Display</Button>
                </form>
                {vehicle && (
                    <Box sx={{ mt: 5, backgroundColor: bgColor, p: 2 }}>
                        <Typography variant="h6">VIN: {vehicle[0].toString()}</Typography>
                        <Typography variant="h6">Odometer Reading: {vehicle[1].toString()}</Typography>
                        <Typography variant="h6">Year of Production: {vehicle[2].toString()}</Typography>
                        <Typography variant="h6">Car Model: {vehicle[3].toString()}</Typography>
                        <Typography variant="h6">Stolen: {vehicle[4] ? 'Yes' : 'No'}</Typography>
                    </Box>
                )}
                {insights && (
                    <Box sx={{ mt: 5, backgroundColor: bgColor, p: 2, color: 'green' }}>
                        <Typography variant="h6">AI Insights:</Typography>
                        <Typography variant="body1">{insights}</Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default DisplayVehicleInformation;
