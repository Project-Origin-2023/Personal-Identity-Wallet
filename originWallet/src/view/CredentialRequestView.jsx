import React from 'react';
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';

const CredentialRequestView = ({presentableCredentials,preferencesPC,setPreferencesPC, credentials,handleFulfill}) => {

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  function handleClickCheckbox(e) {
    console.log(preferencesPC);
    preferencesPC[e.target.value] = !preferencesPC[e.target.value]; 
    console.log(preferencesPC);  
    e.stopPropagation();
  }

  function togglePreference(credentialId) { 
    preferencesPC[credentialId] = !preferences[credentialId];     
  } 

  return (
    <Container component="main" maxWidth="md">
        <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center">
          {presentableCredentials.map((row, index) => (
          <Grid item xs={12} md={8}>
            <Accordion expanded={expanded === `panel${row.credentialId}`} onChange={handleChange(`panel${row.credentialId}`)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Grid item md={2}>
                  <Checkbox
                    value={`${row.credentialId}`}
                    color="primary"
                    onClick={e => handleClickCheckbox(e)}
                    //checked={preferencesPC[row.credentialId]}
                  />
                </Grid>
                <Grid item md={5}>
                  <Typography variant="caption">
                  {credentials.get(row.credentialId).type.join(' - ')}
                  </Typography>
                </Grid>
                <Grid item md={5}>
                  <Typography variant="caption">
                  {credentials.get(row.credentialId).issuanceDate}
                  </Typography>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                  Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          ))}
          <Grid item xs={12} md={12}>
          </Grid>
        </Grid>
    </Container>
  );
};

export default CredentialRequestView;
