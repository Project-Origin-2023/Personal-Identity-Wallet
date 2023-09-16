import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';



export default function BackdropView() {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
      setOpen(false);
    };
  
    const style = {
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      };

    return (
        <Container maxWidth="lg">
        <List component="container" aria-label="mailbox folders" >
                <ListItem >
                    <Typography variant="h4" component="h4">
                    Ancora nessun dato da mostrare
                    </Typography>
                </ListItem>
                <Divider />
                <ListItem>
                    <CircularProgress color="inherit" />
                </ListItem>
            </List>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >   
        </Backdrop>
    </Container>
    );
}