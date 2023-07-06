import React from 'react';
import { Link } from 'react-router-dom';
import useToken from './useToken';
import { Typography } from '@mui/material';

const Logout = () => {
  const { logout } = useToken();

  const handleLogout = () => {
    logout();
    // Aggiungi altre logiche per il logout, come reindirizzamento o pulizia dei dati dell'utente
  };

  return (
    <Typography variant="body1" component={Link} to="/" onClick={handleLogout} color="inherit" style={{ textDecoration: 'none' }}>
      Logout
    </Typography>
  );
};

export default Logout;