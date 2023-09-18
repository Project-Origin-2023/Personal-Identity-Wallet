import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Logout from '../Logout';


function NavbarUser({ setToken}) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Origin Wallet Control Pannel
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/StartPresentation">Start Presentation</Button>
        <Button color="inherit" component={Link} to="/StartIssuerInitiatedIssuance">Start Issuance</Button>
        <Button color="inherit" component={Link} to="/ListCredentials">Lista VC</Button>
        <Button color="inherit"><Logout setToken={setToken} /></Button>
      </Toolbar>
    </AppBar>
  );
}


export default NavbarUser;

