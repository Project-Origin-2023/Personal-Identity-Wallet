import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Box, styled } from '@mui/material';

const RequestContainer = styled('div')({
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
  textAlign: 'center',
});

const RequestCredential = () => {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [nameAndFamilyNameAtBirth, setNameAndFamilyNameAtBirth] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token').slice(1,-1);
      const response = await axios.post('http://localhost:19101/credential/request', {
        dateOfBirth: dateOfBirth,
        familyName: familyName,
        firstName: firstName,
        gender: gender,
        nameAndFamilyNameAtBirth: nameAndFamilyNameAtBirth,
        placeOfBirth: placeOfBirth
      }, {
        headers: {
          'x-access-token': token
        }
      });

      // Memorizza le richieste nella lista

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RequestContainer>
      <Title variant="h6">Request Credential</Title>
      <form onSubmit={handleRequest}>
        <Box display="flex" flexDirection="column" gap="8px">
          <TextField
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Family Name"
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Gender"
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Name and Family Name at Birth"
            type="text"
            value={nameAndFamilyNameAtBirth}
            onChange={(e) => setNameAndFamilyNameAtBirth(e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Place of Birth"
            type="text"
            value={placeOfBirth}
            onChange={(e) => setPlaceOfBirth(e.target.value)}
            variant="outlined"
            size="small"
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Request Credential
        </Button>
      </form>
    </RequestContainer>
  );
};

export default RequestCredential;