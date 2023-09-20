import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const ConnectView = ({ wallets, walletList, handleConnect,openidPresentationURIQR, openidPresentationURI }) => {
  return (
    <Container component="main" maxWidth="md">
        <Grid sx={{pt: 8,pb: 6,}} 
        container
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4">Connect con il tuo Wallet ai nostri servizi</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body3">Per accedere ai nostri servizi devi conneterti utilizzando un Wallet compatibile con la tecnologia OpenIDV4 CI/VP e fornire correttamente attraverso una Verifiable Presentation una credenziale di tipo Personal Identity (PID).<br/> Questa credenziale serve solo per autentificarti e capire chi sei, successivamente potrai accedere ai nostri servizi</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Collegati con uno dei Wallet convenzionati</Typography>
            </Grid>
            <Grid item xs={6}>
              {walletList.map((wallet) => (
                <div>
                    <Grid item xs={12}>
                      <Typography variant="caption">{wallets[wallet].description}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                      onClick={() => handleConnect(wallet)}
                      variant="contained"
                      value={wallet}
                      >
                        Connect with {wallet}
                      </Button>
                    </Grid>
                </div>
              ))}
            </Grid>
            <Grid item xs={6}>
              <Card>
              <CardMedia
                    component="img"
                    alt="OIDC Presentation QR Code Not Found"
                    image={openidPresentationURIQR}
                  />
                <CardContent>
                <Typography noWrap sx={{fontSize: '0.5rem'}}>
                    {openidPresentationURI}
                </Typography>
                </CardContent>
              </Card>
            </Grid>
        </Grid>
    </Container>
      
  );
};


export default ConnectView;
