import  { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

const CredentialRequestMaritalView = ({
  maritalData,
  setMaritalData,
  handleSubmit
}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMaritalData({
      ...maritalData,
      [name]: value
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Richiesta Verifiable Credential Marital Status
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="status"
            label="Status"
            name="status"
            value={maritalData.status}
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            id="personalIdentifier"
            label="Personal Identifier"
            name="personalIdentifier"
            value={maritalData.personalIdentifier}
            onChange={handleInputChange}
          />
          {/* Aggiungi altri campi per i dati PID */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Invia Richiesta
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

CredentialRequestMaritalView.propTypes = {
  maritalData: PropTypes.object.isRequired,
  setMaritalData: PropTypes.func.isRequired,
  jwtToken: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CredentialRequestMaritalView;