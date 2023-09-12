import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const AdminVerifyCredentialRequestPidView = ({ pidData, handleVerify }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Verifica Credenziale PID</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Dettagli Personal Identifier:</Typography>
              <Typography variant="body1">
                <strong>Nome:</strong> {pidData.firstName}
              </Typography>
              <Typography variant="body1">
                <strong>Cognome:</strong> {pidData.familyName}
              </Typography>
              <Typography variant="body1">
                <strong>Data di nascita:</strong> {pidData.dateOfBirth}
              </Typography>
              <Typography variant="body1">
                <strong>Luogo di nascita:</strong> {pidData.placeOfBirth}
              </Typography>
              <Typography variant="body1">
                <strong>Indirizzo attuale:</strong> {pidData.currentAddress}
              </Typography>
              <Typography variant="body1">
                <strong>Sesso:</strong> {pidData.gender}
              </Typography>
              <Typography variant="body1">
                <strong>Nome e cognome alla nascita:</strong>{' '}
                {pidData.nameAndFamilyNameAtBirth}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleVerify}
            fullWidth
            variant="contained"
            color="primary"
          >
            Verifica
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

AdminVerifyCredentialRequestPidView.propTypes = {
  pidData: PropTypes.object.isRequired,
  handleVerify: PropTypes.func.isRequired,
};

export default AdminVerifyCredentialRequestPidView;
