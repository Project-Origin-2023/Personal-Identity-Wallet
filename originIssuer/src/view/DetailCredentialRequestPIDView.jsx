import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import CardMedia from '@mui/material/CardMedia';

const DetailCredentialRequestPIDView = ({pidData,vcStatus,handleRelease,handleOpenWalletList,handleCloseWalletList,openWalletList,openidIssuanceURI,openidIssuanceURIQR,wallets}) => {  
  
  return (
    <div>
    <Dialog onClose={handleCloseWalletList} open={openWalletList}style={{
      width: '25%'
    }}>
      <DialogTitle>Selezionare un Wallet <br/> oppure usa il QR Code</DialogTitle>
      <List>
        <ListItem disableGutters>
        <Card>
        <CardMedia
            component="img"
            alt="OIDC Issuance QR Code Not Found"
            image={openidIssuanceURIQR}
          />
        <CardContent>
        <Typography noWrap sx={{fontSize: '0.5rem'}}>
            {openidIssuanceURI} 
        </Typography>
        </CardContent>
        </Card>
        </ListItem>
        {wallets.map((wallet) => (
          <ListItem disableGutters key={wallet}>
            <ListItemButton onClick={() => handleRelease(wallet)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={wallet} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Credenziale PID</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Dettagli Personal Identifier:</Typography>
              <Typography variant="body1">
                <strong>Nome:</strong> {pidData.firstName}
              </Typography>
              <Typography variant="body1">
                <strong>Cognome:</strong> {pidData.familyName}
              </Typography>
              <Typography variant="body1">
                <strong>Data di nascita:</strong> {pidData.dateOfBirth}
              </Typography>
              <Typography variant="body1">
                <strong>Luogo di nascita:</strong> {pidData.placeOfBirth}
              </Typography>
              <Typography variant="body1">
                <strong>Indirizzo attuale:</strong> {pidData.currentAddress}
              </Typography>
              <Typography variant="body1">
                <strong>Sesso:</strong> {pidData.gender}
              </Typography>
              <Typography variant="body1">
                <strong>Nome e cognome alla nascita:</strong> {pidData.nameAndFamilyNameAtBirth}
              </Typography>
              <Typography variant="body1">
                <strong>Rilasciato:</strong> {pidData.released ? (<CheckSharpIcon></CheckSharpIcon>) : (<HighlightOffSharpIcon></HighlightOffSharpIcon>)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Stato Credenziale:</Typography>
          <Typography variant="body1">
            <strong>Stato:</strong> {vcStatus.pending ? "In Revisione": vcStatus.status ? "Approvata" : "Non Approvata"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={vcStatus.pending || pidData.released || !vcStatus.status}
            onClick={handleOpenWalletList}
            fullWidth
            variant="contained"
            color="primary"
          >
            Rilascia Credenziale
          </Button>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default DetailCredentialRequestPIDView;
