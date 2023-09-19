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
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

const StartIssuerInitiatedIssuanceView = ({ handleUriChange, handleStartIssuance }) => {
  return (
    <Container component="main" maxWidth="md">
      <Grid container
      spacing={2}
      direction="row"
      justifyContent="space-evenly"
      alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4">Issuer Initiated Verifiable Credential Issuance</Typography>
          <Typography variant="body">Se si ha iniziato un processo di Credential Issuing da parte di un issuer si puo' continuare attraverso questa pagina il percorso di issuing e la memorizzazione della credenziale sul tuo Wallet.</Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="caption">Incolla qui il openid-initiate-issuance URI per iniziare la Verifiable Credential Issuance:</Typography>
          <Card >
            <CardContent>
              <TextField
              label="OpenID URI"
              multiline
              rows={10}
              variant="standard"
              onChange={handleUriChange}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={5} xs={12}>
          <Button
            onClick={handleStartIssuance}
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SendIcon />}>
            Continue Issuance
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default StartIssuerInitiatedIssuanceView;
