import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const AdminVerifyCredentialRequestMaritalView = ({ maritalData, statusVerification, setStatusVerification, handleVerify }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Verifica Marital Credential</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Dettagli Marital Status:</Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {maritalData.status}
              </Typography>
              <Typography variant="body1">
                <strong>Identificatore personale:</strong> {maritalData.personalIdentifier}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <ToggleButtonGroup
            color="primary"
            value={statusVerification}
            exclusive
            onChange={(event, newStatus) => {
              setStatusVerification(newStatus);
            }}
            aria-label="Platform"
          >
            <ToggleButton value="true">Approva</ToggleButton>
            <ToggleButton value="false">Rifiuta</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item md={6} xs={12}>
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


export default AdminVerifyCredentialRequestMaritalView;
