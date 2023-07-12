import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          issuerApp
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/Register">Registrati</Button>
        <Button color="inherit" component={Link} to="/Login">Login</Button>
        <Button color="inherit" component={Link} to="/RequestCredential">Richiesta credenziale</Button>
        <Button color="inherit" component={Link} to="/ViewCredentialRequest">Visualizzazione richieste</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

