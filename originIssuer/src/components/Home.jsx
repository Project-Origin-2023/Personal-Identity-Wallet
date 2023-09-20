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

export function Home() {
  return (
    <div>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Servizi Verifiable Credential Offerti
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {import.meta.env.VITE_WEBAPP_NAME} è una piattaforma di issuing di Verifiable Credential.<br/>
              Attraverso questa piattaforma si possono generare credenziali di tipo Personal Identity (PID) <br/>oppure una Electronic Attestation of Attributes di tipo Marital Status (EAA Marital Status).
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
                    Richiedi una VC PID
                  </Typography>
                  <Typography>Richiedi una Verifiable Credential di tipo Personal Identity</Typography>
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
                    Richiedi una VC EAA Marital Status
                  </Typography>
                  <Typography>Richiedi un Verifiable Credential di tipo Electronic Attestation of Attributes Marital Status</Typography>
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
    </div>
  );
}

export default Home;