// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Button, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import VehicleForm from './components/VehicleForm';
import UpdateMileage from './components/UpdateMileage';
import UpdateStolenStatus from './components/UpdateStolenStatus';
import DisplayVehicleInformation from './components/DisplayVehicleInformation';
import HomePage from './components/HomePage';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4caf50',
        },
        secondary: {
            main: '#ff9100',
        },
    },
});

const App = () => {
    return (
        <div className="container">
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/register">Register Vehicle</Button>
                        <Button color="inherit" component={Link} to="/update-mileage">Update Mileage</Button>
                        <Button color="inherit" component={Link} to="/update-stolen-status">Update Stolen Status</Button>
                        <Button color="inherit" component={Link} to="/display-vehicle-information">Display Vehicle Information</Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/register" component={VehicleForm} />
                        <Route path="/update-mileage" component={UpdateMileage} />
                        <Route path="/update-stolen-status" component={UpdateStolenStatus} />
                        <Route path="/display-vehicle-information" component={DisplayVehicleInformation} />
                    </Switch>
                </Container>
            </Router>
        </ThemeProvider>
        </div>
    );
};

export default App;
