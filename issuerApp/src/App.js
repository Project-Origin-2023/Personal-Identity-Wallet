import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemText, Container } from '@mui/material';
import { styled } from '@mui/system'; // Aggiunto l'import di styled
import Register from './components/Register';
import Login from './components/Login';
import RequestCredential from './components/RequestCredential';
import ViewCredentialRequest from './components/ViewCredentialRequest';
import Logout from './components/Logout';
import useToken from './components/useToken';

const WhiteListItemText = styled(ListItemText)({
  color: 'white',
});

function App() {
  const { token, setToken } = useToken();

  //OBBLIGA A FARE IL login
  /*
  if(!token) {
    return <Login setToken={setToken} />
  }
  */

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Link>
          </Typography>
          <List component="nav" sx={{ display: 'flex', gap: 2 }}>
            <ListItem disablePadding component={Link} to="/Register">
              <WhiteListItemText primary="Registrati" />
            </ListItem>
            <ListItem disablePadding component={Link} to="/Login">
              <WhiteListItemText primary="Login" />
            </ListItem>
            <ListItem disablePadding component={Link} to="/RequestCredential">
              <WhiteListItemText primary="Richiesta di credenziale" />
            </ListItem>
            <ListItem disablePadding component={Link} to="/ViewCredentialRequest">
              <WhiteListItemText primary="Visualizzazione richieste credenziale" />
            </ListItem>
            <ListItem disablePadding>
              <Logout />
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login setToken={setToken} />} />
          <Route path="/RequestCredential" element={<RequestCredential />} />
          <Route path="/ViewCredentialRequest" element={<ViewCredentialRequest />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
