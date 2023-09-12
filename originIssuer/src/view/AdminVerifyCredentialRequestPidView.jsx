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

const AdminVerifyCredentialRequestPidView = ({pidData, handleVerify}) => {
  return (
    <Container component="main" maxWidth="xs">
      <p>{pidData.currentAddress}</p>
      <p>{pidData.dateOfBirth}</p>
      <p>{pidData.familyName}</p>
      <p>{pidData.firstName}</p>
      <p>{pidData.gender}</p>
      <p>{pidData.nameAndFamilyNameAtBirth}</p>
      <p>{pidData.placeOfBirth}</p>
      <Button onClick={handleVerify} fullWidth variant="contained">
        Verify VC PID
      </Button>
    </Container>
  );
};

AdminVerifyCredentialRequestPidView.propTypes = {
  pidData: PropTypes.object.isRequired,
  handleVerify: PropTypes.func.isRequired,
};

export default AdminVerifyCredentialRequestPidView;