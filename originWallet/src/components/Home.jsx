import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { LicenseLabel } from './LicenseLabel';

export function Home() {
  return (
    <div>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Servizi VC Offerti
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Origin Issuer è una piattaforma di issuing di Verifiable Credential.
              Attraverso questa piattaforma si possono generare credenziali di tipo PID oppure Marital Status.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Richiedi il tuo VC PID
                  </Typography>
                  <Typography>Richiedi un Verifiable Credential di tipo Personal Identifier</Typography>
                </CardContent>
                <CardActions>
                  <Link to="/CredentialRequestPID">
                  <Button size="small">Richiedi</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image="https://source.unsplash.com/random?wallpapers"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Richiedi il tuo VC Marital Status
                  </Typography>
                  <Typography>Richiedi un Verifiable Credential di tipo Marital Status</Typography>
                </CardContent>
                <CardActions>
                <Link to="/CredentialRequestMarital">
                  <Button size="small">Richiedi</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Informazioni da footer
        </Typography>
        <LicenseLabel />
      </Box>
      {/* End footer */}
    </div>
  );
}

export default Home;