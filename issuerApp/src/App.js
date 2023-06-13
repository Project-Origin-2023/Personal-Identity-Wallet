import React from 'react';
import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import RequestCredentialForm from './components/RequestCredentialForm';
import RequestCredential from './components/RequestCredential';
import Login from './components/Login';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                IssuerApp
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Registrati
              </Button>
              <Button color="inherit" component={Link} to="/request">
                Request Credential
              </Button>
              <Button color="inherit" component={Link} to="/getRequest">
                Get Request Credential
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" />
            <Route path="/register" element={<Register />} />
            <Route path="/request" element={<RequestCredentialForm />} />
            <Route path="/getRequest" element={<RequestCredential />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
