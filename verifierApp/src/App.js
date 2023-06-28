import React from 'react';
import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import {Login} from "./components/views/Login";
import {Services} from "./components/views/Services";
import { darkTheme } from './components/comps/Themes';
import { Connect } from './components/views/Connect';

function App() {
  return (
    <Router>
      <AuthProvider>
      <ThemeProvider theme={darkTheme}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                verifierApp
              </Typography>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/services">Services</Button>
              <Button color="inherit" component={Link} to="/connect">Connect</Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
            <Route path="/connect" element={<Connect />} />
          </Routes>
      </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}


export default App;
