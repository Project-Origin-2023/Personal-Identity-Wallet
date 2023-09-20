import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

const DetailCredentialView = ({ credential, handleDelete }) => {
  return (
    <Container component="main" maxWidth="md">
      <Grid sx={{pt: 8,pb: 6,}} 
      container
      spacing={2}
      direction="row"
      justifyContent="space-evenly"
      alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4">Verifiable Credential</Typography>
        </Grid>
        <Grid item md={8} xs={12}>
          <Typography variant="h6">Dettagli Verifiable Credential:</Typography>
          <Card>
            <CardContent>
              {Object.keys(credential.credentialSubject).map((key)=>{
                return (<Typography variant="body1">
                <strong>{key}: </strong> {credential.credentialSubject[key]}
                </Typography>)
              })}
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={8} xs={12}>
          <Typography variant="h6">Stato Credenziale:</Typography>
          <Typography variant="body1">
            <strong>issuanceDate:</strong> {new Date(credential.issuanceDate).toUTCString()}
          </Typography>
          <Typography variant="body1">
            <strong>issued:</strong> {new Date(credential.issued).toUTCString()}
          </Typography>
          <Typography variant="body1">
            <strong>validFrom:</strong> {new Date(credential.validFrom).toUTCString()}
          </Typography>
          <Typography variant="body1">
            <strong>Expiration Date:</strong> {new Date(credential.expirationDate).toUTCString()}
          </Typography>
          
        </Grid>
        <Grid item md={4} xs={12}>
          <Button
            onClick={handleDelete}
            fullWidth
            variant="contained"
            color="error"
            size="large"
            startIcon={<DeleteIcon />}>
            Elimina Credenziale
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Card>
              <CardContent style={{overflow: 'auto'}}>
                <Typography gutterBottom variant="h5" component="div">
                  JSON Credenziale
                </Typography>
                <pre>{JSON.stringify(credential, null, 2) }</pre>
              </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
DetailCredentialView.propTypes = {
  credential: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default DetailCredentialView;
