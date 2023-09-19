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
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
             Origin Wallet
            </Typography>
            <Typography variant="body4" align="center" color="text.secondary" paragraph>
              Origin Wallet ti offre la possibilita' di avere un wallet combatibile con la tecnologia OpenID 4 CI/VP.<br/>
              Questa piattaforma ti permette di memorizzare in Cloud tutte le tue credenziali, di riceverne di nuove da un Issuer oppure di presentarne a un Verifier.<br/>
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
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
                    Start Issuer Initiated Credential Issuing
                  </Typography>
                  <Typography>Se hai fatto partire un percorso di credential issuing dalla piattaforma di un issuer attraverso questa pagina potrai continuare il issuing e ricevere la credenziale sul tuo wallet.</Typography>
                </CardContent>
                <CardActions>
                  <Link to="/StartIssuerInitiatedIssuance">
                  <Button size="small">Start</Button>
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
                    Start Verifiable Presentation
                  </Typography>
                  <Typography>Se un verifier ha bisogna di una presentazione, e hai fatto partire dalla sua piattaforma il percorso di verifiable presentation, attraverso questa pagina potrai completarla e fornire una credenziale al verifier.</Typography>
                </CardContent>
                <CardActions>
                <Link to="/StartPresentation">
                  <Button size="small">Start</Button>
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