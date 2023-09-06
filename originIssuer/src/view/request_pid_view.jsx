import React, { useState } from 'react';
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

const CredentialRequestPIDView = ({
  pidData,
  setPIDData,
  jwtToken,
  handleSubmit
}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPIDData({
      ...pidData,
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
          Richiesta VCS PID
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="vcs_request"
            label="VCS Request"
            name="vcs_request"
            value={pidData.vcs_request}
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            id="currentAddress"
            label="Current Address"
            name="currentAddress"
            value={pidData.currentAddress}
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            id="dateOfBirth"
            label="Date of Birth"
            name="dateOfBirth"
            value={pidData.dateOfBirth}
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
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/Login" variant="body2">
                Torna al Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

CredentialRequestPIDView.propTypes = {
  pidData: PropTypes.object.isRequired,
  setPIDData: PropTypes.func.isRequired,
  jwtToken: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CredentialRequestPIDView;