import React from 'react';
import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import {Home} from "./components/views/Home";
import {Service} from "./components/views/Service";
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
              
              <Button color="inherit" component={Link} to="/home">Home</Button>
              <Button color="inherit" component={Link} to="/service">Service</Button>
              <Button color="inherit" component={Link} to="/connect">Connect</Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" />
            <Route path="/home" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/connect" element={<Connect />} />
          </Routes>
      </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}


export default App;
