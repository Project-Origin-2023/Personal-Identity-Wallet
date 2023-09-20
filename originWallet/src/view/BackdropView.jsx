import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';

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
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
         >
        <List component="container" aria-label="mailbox folders" >
            <ListItem >
                <Typography variant="h4" component="h4">
                Ancora nessun dato da mostrare
                </Typography>
            </ListItem>
            <Divider />
            <ListItem>
                <CircularProgress 
                color="inherit" />
            </ListItem>
        </List>
        </Grid>
    );
}