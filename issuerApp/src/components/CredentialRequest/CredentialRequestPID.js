import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Typography, TextField, Button, Box, styled, Select, MenuItem, InputLabel } from '@mui/material';

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

const genderOptions = [
  { label: 'Maschio', value: 'm' },
  { label: 'Femmina', value: 'f' },
];

const CredentialRequestPID = ({ token }) => {
  const [dateofbirth, setDateOfBirth] = useState('');
  const [familyname, setFamilyName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [nameandfamilynameatbirth, setNameAndFamilyNameAtBirth] = useState('');
  const [placeofbirth, setPlaceOfBirth] = useState('');

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:19101/credential/request', {
        dateofbirth: dateofbirth,
        familyname: familyname,
        firstname: firstname,
        gender: gender,
        nameandfamilynameatbirth: nameandfamilynameatbirth,
        placeofbirth: placeofbirth,
      }, {
        headers: {
          'x-access-token': token
        }
      });

      alert(response.data.message);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RequestContainer>
      <Title variant="h6">Credential Request PID</Title>
      <Box component="form" noValidate onSubmit={handleRequest}>
        <Box display="flex" flexDirection="column" gap="8px">
          <TextField
            label="Date of Birth"
            type="date"
            value={dateofbirth}
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
            value={familyname}
            onChange={(e) => setFamilyName(e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="First Name"
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            variant="outlined"
            size="small"
          />
          <InputLabel htmlFor="gender-select">Gender</InputLabel>
          <Select
            labelId="gender-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            variant="outlined"
            size="small"
          >
            {genderOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Name and Family Name at Birth"
            type="text"
            value={nameandfamilynameatbirth}
            onChange={(e) => setNameAndFamilyNameAtBirth(e.target.value)}
            variant="outlined"
            size="small"
          />
          <TextField
            label="Place of Birth"
            type="text"
            value={placeofbirth}
            onChange={(e) => setPlaceOfBirth(e.target.value)}
            variant="outlined"
            size="small"
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Request Credential
        </Button>
      </Box>
    </RequestContainer>
  );
};

CredentialRequestPID.propTypes = {
  token: PropTypes.string.isRequired,
};

export default CredentialRequestPID;
