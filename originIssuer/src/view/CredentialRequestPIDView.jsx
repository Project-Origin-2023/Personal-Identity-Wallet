import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { InputLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'; // Importa DatePicker da @mui/x-date-pickers
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Importa AdapterDateFns da @mui/x-date-pickers


const CredentialRequestPIDView = ({
  pidData,
  setPIDData,
  handleSubmit
}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPIDData({
      ...pidData,
      [name]: value
    });
  };

  const setDateOfBirth = (date) =>{
    pidData.dateOfBirth = date;
    setPIDData(pidData);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Richiesta Verifiable Credential PID (Personal Identifier)
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="familyName"
            label="Family Name"
            name="familyName"
            value={pidData.familyName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={pidData.firstName}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            fullWidth
            id="nameAndFamilyNameAtBirth"
            label="Name And Family Name At Birth"
            name="nameAndFamilyNameAtBirth"
            value={pidData.nameAndFamilyNameAtBirth}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            required
            fullWidth
            id="gender"
            labelId="Gender-label"
            //label="Gender" non viene renderizzata a schermo
            name="gender"
            value={pidData.gender}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            >
            <MenuItem value="M">M</MenuItem>
            <MenuItem value="F">F</MenuItem>
          </Select>
          <TextField
            required
            fullWidth
            id="personalIdentifier"
            label="Personal Identifier"
            name="personalIdentifier"
            value={pidData.personalIdentifier}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            fullWidth
            id="placeOfBirth"
            label="Place Of Birth"
            name="placeOfBirth"
            value={pidData.placeOfBirth}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            fullWidth
            id="currentAddress"
            label="Current Address"
            name="currentAddress"
            value={pidData.currentAddress}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
            <DatePicker
              required
              fullWidth
              id="dateOfBirth"
              label="Date of Birth"
              name="dateOfBirth"
              value={pidData.dateOfBirth}
              onChange={(newValue) => setDateOfBirth(newValue)}
              sx={{ mb: 2 }}
            />
            {/* Aggiungi altri campi per i dati PID */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Invia Richiesta
            </Button>
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default CredentialRequestPIDView;
