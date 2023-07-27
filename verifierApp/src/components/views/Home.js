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
import { LicenseLabel } from '../comps/LicenseLabel';

// Update the cards array to contain 3 elements instead of 6
const cards = [
  { id: 1, title: 'Richiedi ISEE', description: 'Valuta la tua situazione economica per accedere a servizi e agevolazioni.' },
  { id: 2, title: 'Richiedi CUD', description: 'Ottieni il Certificato Unico di Dipendenza per la dichiarazione dei redditi.' },
  { id: 3, title: 'Deposita 730', description: 'Effettua la dichiarazione dei redditi e scopri le detrazioni fiscali disponibili.' },
];

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
              Servizi
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Esplora i nostri servizi dedicati per semplificare la gestione delle tue questioni finanziarie.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
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
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <Link to="/Connect">
                    <Button size="small">Connettiti</Button>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Informazioni da footer
        </Typography>
        <LicenseLabel />
      </Box>
      {/* End footer */}
    </div>
  );
}
