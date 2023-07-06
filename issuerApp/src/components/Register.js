import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Box, styled } from '@mui/material';

const RegisterContainer = styled('div')({
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
  textAlign: 'center', // Centra il testo orizzontalmente
});

const Register = () => {
  const [familyName, setFamilyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:19101/Register', {
        familyName: familyName,
        firstName: firstName,
        email: email,
        password: password,
      });

      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RegisterContainer>
      <Title variant="h6">Registrazione</Title>
      <form onSubmit={handleRegister}>
        <Box display="flex" flexDirection="column" gap="8px">
          <TextField
            label="Cognome"
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            variant="outlined"
            size="small"
            required
          />
          <TextField
            label="Nome"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            variant="outlined"
            size="small"
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            size="small"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            size="small"
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Registrati
        </Button>
      </form>
    </RegisterContainer>
  );
};

export default Register;