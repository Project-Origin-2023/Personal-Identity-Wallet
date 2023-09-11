import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import { InputLabel } from '@mui/material';

const DetailCredentialRequestPIDView = ({pidData,vcStatus, handleRelease}) => {
  console.log(pidData)
  console.log(vcStatus)
  return (
    <Container component="main" maxWidth="xs">
      <p>{pidData.currentAddress}</p>
      <p>{pidData.dateOfBirth}</p>
      <p>{pidData.familyName}</p>
      <p>{pidData.firstName}</p>
      <p>{pidData.gender}</p>
      <p>{pidData.nameAndFamilyNameAtBirth}</p>
      <p>{pidData.placeOfBirth}</p>
      <p>{pidData.released}</p>
      <p>{vcStatus.pending}</p>
      <p>{vcStatus.status ? vcStatus.status : "In revisione"}</p>
      <Button disabled={vcStatus.pending || pidData.released || !vcStatus.status}
      onClick={handleRelease} fullWidth variant="contained">
        Rilascia Credenziale
      </Button>
    </Container>
  );
};

DetailCredentialRequestPIDView.propTypes = {
  pidData: PropTypes.object.isRequired,
  vcStatus: PropTypes.object.isRequired,
  handleRelease: PropTypes.func.isRequired,
};

export default DetailCredentialRequestPIDView;