import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Logout from '../Logout';


function NavbarUser({ setToken }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          issuerApp
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/CredentialRequestPID">Richiesta credenziale PID</Button>
        <Button color="inherit" component={Link} to="/ViewCredentialRequests">Visualizzazione richieste</Button>
        <Button color="inherit"><Logout setToken={setToken} /></Button>
      </Toolbar>
    </AppBar>
  );
}

NavbarUser.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default NavbarUser;

