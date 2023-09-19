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
import { Divider } from '@mui/material';
import Chip from '@mui/material/Chip';

const CredentialRequestView = ({presentableCredentials,preferencesPC,setPreferencesPC, credentials,handleFulfill}) => {
  //state for Accordion
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  //state for button fullfill
  const [fulfillDisabled, setFullfillDisabled] = useState(true);

  function handleChangeCheckbox(e) {
    //Modifico le preferences del Presentation Credential da selezionare per l'invio come fullfill
    let pr = preferencesPC;
    pr[e.target.value] = !pr[e.target.value]
    setPreferencesPC(pr)
    setFullfillDisabled(!Object.values(preferencesPC).some(val => val === true));
  }

  return (
    <Container component="main" maxWidth="md">
    <Card>
    <CardContent>
        <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center">
          <Grid item xs={12}>
          <Typography variant="h4">RIchiesta di Credenziale per</Typography>
          <Typography variant="h6">Verifiable Presentation</Typography>
          <Typography variant="body2">Un verifier richiede la tua attenzione per fornirgli una credenziale per una verifiable presentation</Typography>
          <Divider>
            <Chip label="Credenziali Presentabili" />
          </Divider>
          </Grid>
          {presentableCredentials.map((row, index) => (
          <Grid item xs={12} md={9}>
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
                    onClick={e => e.stopPropagation()}
                    onChange={e => handleChangeCheckbox(e)}
                  />
                </Grid>
                <Grid item md={5}>
                  <Typography variant="caption">
                  <strong>Type:</strong> {credentials.get(row.credentialId).type.join(' - ')}
                  </Typography>
                </Grid>
                <Grid item md={5}>
                  <Typography variant="caption">
                  <strong>Issuance Date:</strong> {new Date(credentials.get(row.credentialId).issuanceDate).toUTCString()}
                  </Typography>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                  {Object.keys(credentials.get(row.credentialId).credentialSubject).map((key)=>{
                    return (
                    <Typography variant="caption">
                    <strong>{key}: </strong> {credentials.get(row.credentialId).credentialSubject[key]} <br/>
                    </Typography>)
                  })}
              </AccordionDetails>
            </Accordion>
          </Grid>
          ))}
          <Grid item xs={12} md={12}>
          <Button
            onClick={handleFulfill}
            fullWidth
            variant="contained"
            color="success"
            size="large"
            disabled={fulfillDisabled}
          >
            Present Credentials
          </Button>
          </Grid>
        </Grid>
    </CardContent>
    </Card>
    </Container>
  );
};

export default CredentialRequestView;
