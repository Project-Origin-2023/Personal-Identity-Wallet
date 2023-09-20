import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const Logout = ({ setToken }) => {

  const handleLogout = () => {
    setToken(null);
    window.location.reload(true);
    window.location.href = '/';
  };

  return (
    <Typography variant="body1" component={Link} to="/" onClick={handleLogout} color="error" style={{ textDecoration: 'none' }}>
      Logout
    </Typography>
  );
};

export default Logout;