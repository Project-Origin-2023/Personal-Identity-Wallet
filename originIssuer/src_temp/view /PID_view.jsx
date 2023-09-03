import React from 'react';
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

const CredentialRequestView = ({
  dateofbirth,
  setDateOfBirth,
  familyname,
  setFamilyName,
  firstname,
  setFirstName,
  gender,
  setGender,
  nameandfamilynameatbirth,
  setNameAndFamilyNameAtBirth,
  placeofbirth,
  setPlaceOfBirth,
  requestCredential,
  handleRequest,
}) => (
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

CredentialRequestView.propTypes = {
  dateofbirth: PropTypes.string.isRequired,
  setDateOfBirth: PropTypes.func.isRequired,
  familyname: PropTypes.string.isRequired,
  setFamilyName: PropTypes.func.isRequired,
  firstname: PropTypes.string.isRequired,
  setFirstName: PropTypes.func.isRequired,
  gender: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
  nameandfamilynameatbirth: PropTypes.string.isRequired,
  setNameAndFamilyNameAtBirth: PropTypes.func.isRequired,
  placeofbirth: PropTypes.string.isRequired,
  setPlaceOfBirth: PropTypes.func.isRequired,
  requestCredential: PropTypes.func.isRequired,
  handleRequest: PropTypes.func.isRequired,
};

export default CredentialRequestView;
