import React, { useState } from 'react';
import {
  Typography,
  Button,
  Box,
  Paper,
  CssBaseline,
  Grid,
} from '@mui/material';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';


const View = () => {
  const [requestImg, setRequestImg] = useState('');
  const [responseLabel, setResponseLabel] = useState('');
  
  const handleTask1 = async (e) => {
    e.preventDefault();
    try {
      console.log("hell");
      var data = JSON.stringify({
        "type": [
          "PID"
        ],
        "@context": [
          "https://www.w3.org/2018/credentials/v1"
        ],
        "credentialSchema": {
          "id": "https://raw.githubusercontent.com/walt-id/waltid-ssikit-vclib/master/src/test/resources/schemas/VerifiableId.json",
          "type": "FullJsonSchemaValidator2021"
        },
        "credentialStatus": {
          "id": "",
          "type": ""
        },
        "credentialSubject": {
          "currentAddress": [],
          "dateOfBirth": "",
          "familyName": "",
          "firstName": "",
          "gender": "",
          "id": "",
          "identifier": [],
          "nameAndFamilyNameAtBirth": "",
          "personalIdentifier": "",
          "placeOfBirth": ""
        },
        "evidence": [
          {
            "documentPresence": [],
            "evidenceDocument": [],
            "id": "",
            "subjectPresence": [],
            "type": [],
            "verifier": ""
          }
        ],
        "id": "",
        "issuanceDate": "",
        "issued": "",
        "issuer": "",
        "validFrom": ""
      });

      var config = {
        method: 'post',
        url: 'http://localhost:19011/v1/templates/PID',
        headers: { 
          'accept': 'text/plain', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setResponseLabel(JSON.stringify(response.data));
        setRequestImg("./img/task1.jpg");
      })
      .catch(function (error) {
        console.log(error);
      });      
    } catch (error) {
      console.log(error);
    }
  };

  return ( 
    <div> 
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline /> 
        <Grid item xs={false} sm={4} md={4}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Request
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                image={requestImg}
              />
            </CardActionArea>
          </Card>
        </Grid> 
        <Grid item xs={false} sm={4} md={4}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Response
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <pre>{responseLabel}</pre>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid> 
        <Grid item xs={false} sm={4} md={4} component={Paper} elevation={6} square> 
            <Typography component="h1" variant="h5"> 
              Walt.id API Collection Requests
            </Typography> 
            <Box component="form" noValidate onSubmit={handleTask1} sx={{ mt: 1 }}>  
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ mt: 3, mb: 2 }} 
              > 
                1) Issuer Create PID Template
              </Button> 
          </Box> 
        </Grid> 
      </Grid> 
    </div> 
  ); 
}


function App() {
  return (
    <View/>
  );
}

export default App;
