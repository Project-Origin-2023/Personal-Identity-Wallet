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

const InitiateIssuanceView = ({ credentialOffer, handleAcceptIssuance}) => {
  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">VC Offer:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">Dettaglio Verifiable Credential:</Typography>
          <Typography variant="body1">
            <strong>Types:</strong> {credentialOffer.credentialTypes}
          </Typography>
          <Typography variant="body1">
            <strong>issuerId:</strong> {credentialOffer.issuerId}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={handleAcceptIssuance}
            fullWidth
            variant="contained"
            color="primary"
          >
            Accept
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Card>
              <CardContent style={{overflow: 'auto'}}>
                <Typography gutterBottom variant="h5" component="div">
                  JSON Credential Offer
                </Typography>
                <pre>{JSON.stringify(credentialOffer, null, 2) }</pre>
              </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
InitiateIssuanceView.propTypes = {
  credential: PropTypes.object.isRequired,
  handleAcceptIssuance: PropTypes.func.isRequired,
};
export default InitiateIssuanceView;
