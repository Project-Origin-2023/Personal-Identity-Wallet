
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';


const ServiceIseeView = () => {
  return (
    <Container component="main" maxWidth="md">
        <Grid sx={{pt: 8,pb: 6,}} 
        container
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h2">Hai Acceduto con successo il Service Richiesta Isee</Typography>
            </Grid>
        </Grid>
    </Container>
      
  );
};


export default ServiceIseeView;
