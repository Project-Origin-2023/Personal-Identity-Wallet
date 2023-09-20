import Avatar from '@mui/material/Avatar';
import {InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const CredentialRequestMaritalView = ({
  maritalData,
  setMaritalData,
  handleSubmit
}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMaritalData({
      ...maritalData,
      [name]: value
    });
  };

  return (
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
          Richiesta Verifiable Credential Marital Status
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <InputLabel>Status</InputLabel>
      <Select
        required
        fullWidth
        id="status"
        label="Status"
        name="status"
        value={maritalData.status}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="canceled">canceled</MenuItem>
        <MenuItem value="married">married</MenuItem>
        <MenuItem value="divorced">divorced</MenuItem>
        <MenuItem value="widower">widower</MenuItem>
        <MenuItem value="separate">separate</MenuItem>
        <MenuItem value="other">other</MenuItem>
        <MenuItem value="cohabitant">cohabitant</MenuItem>
      </Select>
          <TextField
            required
            fullWidth
            id="personalIdentifier"
            label="Personal Identifier"
            name="personalIdentifier"
            value={maritalData.personalIdentifier}
            onChange={handleInputChange}
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
  );
};


export default CredentialRequestMaritalView;