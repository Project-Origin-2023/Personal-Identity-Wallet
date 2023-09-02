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
  Paper,
  Avatar,
  CssBaseline,
  Link,
  Grid,
} from '@mui/material';


const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:19101/login', {
        email: email,
        password: password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        alert(response.data.message);
        window.location.reload(true);
        window.location.href = '/';
      }
      else{
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
                <Link href="/Register" variant="body2"> 
                  {"Don't have an account? Register"} 
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