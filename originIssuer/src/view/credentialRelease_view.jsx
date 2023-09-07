import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

const CredentialReleaseView = ({
  credentialData,
  setCredentialData,
  jwtToken,
  handleRequest,
  handleRelease,
  releaseUrl,
  isApproved
}) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentialData({
      ...credentialData,
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
          {isApproved ? 'Rilascio Credenziale' : 'Richiesta Credenziale'}
        </Typography>
        <Box component="form" noValidate onSubmit={isApproved ? handleRelease : handleRequest} sx={{ mt: 3 }}>
          <TextField
            required
            fullWidth
            id="credential_request"
            label="Credenziale Request"
            name="credential_request"
            value={credentialData.credential_request}
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            id="currentAddress"
            label="Current Address"
            name="currentAddress"
            value={credentialData.currentAddress}
            onChange={handleInputChange}
          />
          <TextField
            required
            fullWidth
            id="dateOfBirth"
            label="Date of Birth"
            name="dateOfBirth"
            value={credentialData.dateOfBirth}
            onChange={handleInputChange}
          />
          {isApproved && (
            <TextField
              fullWidth
              id="releaseUrl"
              label="Release URL"
              name="releaseUrl"
              value={releaseUrl}
              InputProps={{
                readOnly: true,
              }}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isApproved}
          >
            Rilascia Credenziale
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/Login" variant="body2">
                Torna al Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

CredentialReleaseView.propTypes = {
  credentialData: PropTypes.object.isRequired,
  setCredentialData: PropTypes.func.isRequired,
  jwtToken: PropTypes.string.isRequired,
  handleRequest: PropTypes.func.isRequired,
  handleRelease: PropTypes.func.isRequired,
  releaseUrl: PropTypes.string.isRequired,
  isApproved: PropTypes.bool.isRequired,
};

export default CredentialReleaseView;
