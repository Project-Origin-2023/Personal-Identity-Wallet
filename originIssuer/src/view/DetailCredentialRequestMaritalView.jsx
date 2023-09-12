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

const DetailCredentialRequestMaritalView = ({ marData, vcStatus, handleRelease }) => {
  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Marital Status</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Dettagli utente:</Typography>
              <Typography variant="body1">
                <strong>Stato:</strong> {marData.status}
              </Typography>
              <Typography variant="body1">
                <strong>Identificatore personale:</strong> {marData.personalIdentifier}
              </Typography>
              <Typography variant="body1">
                <strong>Rilasciato:</strong> {marData.released}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Stato Credenziale:</Typography>
          <Typography variant="body1">
            <strong>Stato:</strong> {vcStatus.status ? vcStatus.status : "In revisione"}
          </Typography>
          <Typography variant="body1">
            <strong>Pending:</strong> {vcStatus.pending ? 'Sì' : 'No'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={vcStatus.pending || marData.released || !vcStatus.status}
            onClick={handleRelease}
            fullWidth
            variant="contained"
            color="primary"
          >
            Rilascia Credenziale
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

DetailCredentialRequestMaritalView.propTypes = {
  marData: PropTypes.object.isRequired,
  vcStatus: PropTypes.object.isRequired,
  handleRelease: PropTypes.func.isRequired,
};

export default DetailCredentialRequestMaritalView;
