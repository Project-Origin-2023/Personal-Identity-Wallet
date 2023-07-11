/*

CODICE INIZIALE DI MICHELE


import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Typography, TextField, Button, Box, styled } from '@mui/material';

const LoginContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  maxWidth: '300px',
  margin: '0 auto',
});

const Title = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '24px',
  marginBottom: '16px',
});

const FieldsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:19101/Login', {
        email: email,
        password: password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContainer>
      <Title variant="h6">Effettua il login</Title>
      <form onSubmit={handleLogin}>
        <FieldsContainer>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            size="small"
          />
        </FieldsContainer>
        <Button type="submit" variant="contained" color="primary">
          Accedi
        </Button>
      </form>
    </LoginContainer>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
*/











//soluzione 7

import React, { useState } from 'react';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'; 
import { LicenseLabel } from './LicenseLabel'; 
import PropTypes from 'prop-types';
import {
  Typography,
  TextField,
  Button,
  Box,
  styled,
  Paper,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
} from '@mui/material';
//import { LockOutlined } from '@mui/icons-material';


const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:19101/Login', {
        email: email,
        password: password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

return ( 
  <div> 
    <Grid container component="main" sx={{ height: '100vh' }}> 
      <CssBaseline /> 
      <Grid 
        item 
        xs={false} 
        sm={4} 
        md={7} 
        sx={{ 
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)', 
          backgroundRepeat: 'no-repeat', 
          backgroundColor: (t) => 
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900], 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
        }} 
      /> 
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square> 
        <Box 
          sx={{ 
            my: 8, 
            mx: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
          }} 
        > 
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> 
            <LockOutlinedIcon /> 
          </Avatar> 
          <Typography component="h1" variant="h5"> 
            Sign in 
          </Typography> 
          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}> 
            <TextField 
              margin="normal" 
              required 
              fullWidth 
              id="email" 
              type="email"
              label="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email" 
              autoComplete="email" 
              autoFocus 
            /> 
            <TextField 
              margin="normal" 
              required 
              fullWidth 
              name="password" 
              label="Password" 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password" 
            /> 
            <FormControlLabel 
              control={<Checkbox value="remember" color="primary" />} 
              label="Remember me" 
            /> 
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              sx={{ mt: 3, mb: 2 }} 
            > 
              Sign In 
            </Button> 
            <Grid container> 

              <Grid item> 
                <Link href="#" variant="body2"> 
                  {"Don't have an account? Sign Up"} 
                </Link> 
              </Grid> 
            </Grid> 
            <LicenseLabel sx={{ mt: 5 }} /> 
          </Box> 
        </Box> 
      </Grid> 
    </Grid> 
  </div> 
); 
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;