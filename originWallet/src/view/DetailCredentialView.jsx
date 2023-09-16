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
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

const DetailCredentialView = ({ credential, handleDelete }) => {
  return (
    <Container component="main" maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Credenziale</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Dettagli </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Stato Credenziale:</Typography>
          <Typography variant="body1">
            <strong>Stato:</strong> {}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleDelete}
            fullWidth
            variant="contained"
            color="primary"
          >
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
