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
             Origin Verifier
            </Typography>
            <Typography variant="body4" align="center" color="text.secondary" paragraph>
              Origin Verifier (Origin CAF) ti permette di accedere a servizi di patronato CAF gratuitamente e in maniera immediata.<br/>
              Attraverso questa piattaforma potrai accedere per esempio a servizi come la richiesta del tuo ISEE, Modello Unico o CUD.<br/>
              Per accedere a questi servizi non necessiti di nessun sportello fisico, infatti la procedura di autenticazione e la fornitura dei documenti avviene tramite la tecnologia OpenID 4 CI/VP.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Servizio Richiesta ISEE
                  </Typography>
                  <Typography>Attraverso questo servizio potrai richiedere il tuo ISEE parificato, unificato o ISEE MINI.</Typography>
                </CardContent>
                <CardActions>
                  <Link to="/ServiceIsee">
                    <Button size="small">Accedi</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Servizio richiesta Modello Unico
                  </Typography>
                  <Typography>Attraverso questo servizio potrai richiedere il tuo modello unico e consultare l'archivio con tutti i tuoi reditti, il modello unico e' dedicato a persone con Partita IVA</Typography>
                </CardContent>
                <CardActions>
                <Typography>Coming Soon</Typography>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Servizio Richiesta CUD
                  </Typography>
                  <Typography>Attraverso questo servizio potrai richiedere il uo CUD, un CUD e' un documento dato per ogni rapporto lavorativo avutoin una annata e si puo' richiedere da qualsiasi persona avente un contratto di lavoro</Typography>
                </CardContent>
                <CardActions>
                <Typography>Coming Soon</Typography>
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