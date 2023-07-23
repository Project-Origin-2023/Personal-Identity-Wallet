import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';

import { LicenseLabel } from '../comps/LicenseLabel';

export function Connect() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
      <div>
        <CssBaseline />
        
        <Container component="main" maxWidth="xs">
          <Grid 
                container
                justifyContent="center"
                alignItems="center"
                component="form" 
                onSubmit={handleSubmit} 
                noValidate 
                spacing={4}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    Connect to a Wallet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Per accedere al servizio devi presentare una credenziale valida collegando un tuo wallet.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="contained" />
            </Grid>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="walletURI"
                label="Wallet URI"
                name="walletURI"
                autoComplete="Wallet URI"
                autoFocus
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
              >
                Connect
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="contained" > <Chip label="OR" /></Divider>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Connect with Origin Wallet
              </Button>
            </Grid>
          </Grid>
          <LicenseLabel sx={{ mt: 8, mb: 4 }} />
        </Container>
      </div>
      
  );
}