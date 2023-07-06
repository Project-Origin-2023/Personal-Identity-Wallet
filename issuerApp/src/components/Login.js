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