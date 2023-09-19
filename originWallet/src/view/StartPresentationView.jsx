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

const StartPresentationView = ({ handleUriChange, handleStartPresentation}) => {
  return (
    <Container component="main" maxWidth="md">
      <Grid sx={{pt: 8,pb: 6,}} 
      container
      spacing={2}
      direction="row"
      justifyContent="space-evenly"
      alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4">Verifiable Presentation</Typography>
          <Typography variant="body">Se un verifier ti ha richiesto la presentazione di una credenziale attraverso questa pagina puoi completare il percorso di verifiable presentation e potrai fornire una credenziale dal tuo Wallet.</Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="caption">Incolla qui il openid-initiate-issuance URI per iniziare la Verifiable Presentation:</Typography>
          <Card>
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
            onClick={handleStartPresentation}
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SendIcon />}>
            Start Presentation
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default StartPresentationView;
