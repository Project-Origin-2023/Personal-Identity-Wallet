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
import Chip from '@mui/material/Chip';
import { Divider } from '@mui/material';

const InitiateIssuanceView = ({ credentialOffer, handleAcceptIssuance}) => {
  return (
    <Container component="main" maxWidth="md">
    <Card>
    <CardContent>
    <Grid sx={{pt: 8,pb: 6,}} 
      container
      spacing={2}
      direction="row"
      justifyContent="space-evenly"
      alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4">Richiesta di</Typography>
          <Typography variant="h6">Credential Issuing</Typography>
          <Typography variant="body2">Un issuer richiede la tua attenzione per accettare una credenziale che ti e' stata offerta</Typography>
          <Divider>
            <Chip label="Informazioni" />
          </Divider>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6">Dettaglio Verifiable Credential:</Typography>
          <Typography variant="body1">
            <strong>Types:</strong> {credentialOffer.credentialTypes}
          </Typography>
          <Typography variant="body1">
            <strong>issuerId:</strong> {credentialOffer.issuerId}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
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
    </CardContent>
    </Card>
    </Container>
  );
};
InitiateIssuanceView.propTypes = {
  credential: PropTypes.object.isRequired,
  handleAcceptIssuance: PropTypes.func.isRequired,
};
export default InitiateIssuanceView;
