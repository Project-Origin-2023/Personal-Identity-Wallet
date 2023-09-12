import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

const AdminVerifyCredentialRequestMaritalView = ({maritalData, handleVerify}) => {
  return (
    <Container component="main" maxWidth="xs">
      <p>{maritalData.status}</p>
      <p>{maritalData.personalIdentifier}</p>
      <Button onClick={handleVerify} fullWidth variant="contained">
        Verify VC Marital Status
      </Button>
    </Container>
  );
};

AdminVerifyCredentialRequestMaritalView.propTypes = {
  maritalData: PropTypes.object.isRequired,
  handleVerify: PropTypes.func.isRequired,
};

export default AdminVerifyCredentialRequestMaritalView;