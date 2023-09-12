import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Logout from '../Logout';
import AdminListCredentialRequestsController from '../../controller/AdminListCredentialRequestsController';

function NavbarAdmin({ setToken }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Origin Issuer System Admin Controll
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/AdminListCredentialRequests">VCS Request List</Button>
        <Button color="inherit"><Logout setToken={setToken} /></Button>
      </Toolbar>
    </AppBar>
  );
}


export default NavbarAdmin;

