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

const StartIssuerInitiatedIssuanceView = ({ handleUriChange, handleStartIssuance }) => {
  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Issuer Initiated Issuance:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">Incolla qui il openid-initiate-issuance URI per completare la Verifiable Credential Issuance:</Typography>
          <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <TextField
            label="OpenID URI"
            multiline
            rows={4}
            variant="standard"
            onChange={handleUriChange}
            />
          </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={handleStartIssuance}
            fullWidth
            variant="contained"
            color="primary"
          >
            Start
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default StartIssuerInitiatedIssuanceView;
