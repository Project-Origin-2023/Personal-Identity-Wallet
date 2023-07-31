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
import jwt from 'jwt-decode'



const View = () => {
  const [requestImg, setRequestImg] = useState('');
  const [responseLabel, setResponseLabel] = useState('');
  
  function formatJSON(json){
      return json.replaceAll(",",",\n")
  }

  function printResponse(response,requestImg,jwt=null){
    let text = ""+
    "URL = \n"+
    response.request.responseURL+"\n\n"+
    "Status = \n"+
    response.status+" "+response.statusText+"\n\n"+
    "Headers = \n"+
    response.headers+"\n\n"+
    "Body = \n"+
    formatJSON(JSON.stringify(response.data))+"\n\n";

    if(jwt!==null){
      text = text +
      "Body JWT Decoded = \n"+
      formatJSON(JSON.stringify(jwt));
    }
    setResponseLabel(text);
    setRequestImg(requestImg);
  }

  const handleTask1 = async (e) => {
    e.preventDefault();
    try {
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
        printResponse(response,"./img/task1.jpg")
      })
      .catch(function (error) {
        console.log(error);
      });      
    } catch (error) {
      console.log(error);
    }
  };

  const handleTask2 = async (e) => {
    e.preventDefault();
    try {
      var data = JSON.stringify({
        "type": [
          "EAA"
        ],
        "@context": [
          "https://www.w3.org/2018/credentials/v1"
        ],
        "id": "",
        "issuer": "",
        "issuanceDate": "",
        "issued": "",
        "validFrom": "",
        "expirationDate": "",
        "credentialSchema": {
          "id": "https://raw.githubusercontent.com/walt-id/waltid-ssikit-vclib/master/src/test/resources/schemas/VerifiableAttestation.json",
          "type": "JsonSchemaValidator2018"
        },
        "credentialSubject": {
          "id": ""
        },
        "evidence": [
          {
            "documentPresence": "",
            "evidenceDocument": "",
            "id": "",
            "subjectPresence": "",
            "type": [
              "DocumentVerification"
            ],
            "verifier": ""
          }
        ]
      });

      var config = {
        method: 'post',
        url: 'http://localhost:19011/v1/templates/EAA',
        headers: { 
          'accept': 'text/plain', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        printResponse(response,"./img/task2.jpg")
      })
      .catch(function (error) {
        console.log(error);
      });

   
    } catch (error) {
      console.log(error);
    }
  };

  const handleTask3 = async (e) => {
    e.preventDefault();
    try {
      var data = JSON.stringify({
        "method": "key"
      });

      var config = {
        method: 'post',
        url: 'http://localhost:19021/did/create',
        headers: { 
          'accept': 'application/json', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        printResponse(response,"./img/task3.jpg")
      })
      .catch(function (error) {
        console.log(error);
      });

   
    } catch (error) {
      console.log(error);
    }
  };

  const handleTask4 = async (e) => {
    e.preventDefault();
    try {
      var data = JSON.stringify({
        "method": "key"
      });

      var config = {
        method: 'post',
        url: 'http://localhost:19022/did/create',
        headers: { 
          'accept': 'application/json', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        printResponse(response,"./img/task4.jpg")
      })
      .catch(function (error) {
        console.log(error);
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleTask5 = async (e) => {
    e.preventDefault();
    try {
      var data = JSON.stringify({
        "templateId": "PID",
        "config": {
          "subjectDid": "did:key:z6Mkop71PmZzSu5bKmpXEgyR3JqVUUKEuf75XCYqkBs1dAY9",
          "issuerDid": "did:key:z6Mkf13khs49qM6getm3KYC458e2Rgzjv1v6FCE9XhdYiShJ"
        },
        "credentialData": {
          "credentialSubject": {
            "id": "urn:uuid:394870f4-e583-4922-b2fb-25e3ac04341d",
            "currentAddress": [
              "Via Ardoneghe Brugine"
            ],
            "dateOfBirth": "1999-12-29",
            "familyName": "Bob",
            "firstName": "Luca",
            "gender": "MALE",
            "nameAndFamilyNameAtBirth": "Luca Bob",
            "personalIdentifier": "BBRNRC88T29Z127S",
            "placeOfBirth": "Italia"
          },
          "evidence": {
            "documentPresence": [
              "Phisical"
            ],
            "evidenceDocument": [
              "Passport"
            ],
            "id": "123",
            "subjectPresence": [
              "Phisical"
            ],
            "type": [],
            "verifier": "did:key:z6Mkf13khs49qM6getm3KYC458e2Rgzjv1v6FCE9XhdYiShJ"
          }
        }
      });

      var config = {
        method: 'post',
        url: 'http://localhost:19011/v1/credentials/issue',
        headers: { 
          'accept': 'application/json', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        let jwtDecoded = jwt(response.data);
        printResponse(response,"./img/task5.jpg",jwtDecoded)
      })
      .catch(function (error) {
        console.log(error);
      });


    } catch (error) {
      console.log(error);
    }
  };

  const handleTask6 = async (e) => {
    e.preventDefault();
    try {
      var data = 'eyJraWQiOiJkaWQ6a2V5Ono2TWt3M213NzFSMnJFTHNwWk5zaFh1ZUVFemJnZ0o4QWg3dnBaR1NoTGc0azE4SyN6Nk1rdzNtdzcxUjJyRUxzcFpOc2hYdWVFRXpiZ2dKOEFoN3ZwWkdTaExnNGsxOEsiLCJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSJ9.eyJpc3MiOiJkaWQ6a2V5Ono2TWt3M213NzFSMnJFTHNwWk5zaFh1ZUVFemJnZ0o4QWg3dnBaR1NoTGc0azE4SyIsInN1YiI6ImRpZDprZXk6ejZNa3VIaTY4QXZpOGIzNmJoc0h1a0xUZDNKMjJRdFhRY1FmNW1YVTR6blloY1drIiwibmJmIjoxNjg4MTI4ODQ4LCJpYXQiOjE2ODgxMjg4NDgsInZjIjp7InR5cGUiOlsiRUFBIl0sIkBjb250ZXh0IjpbImh0dHBzOi8vd3d3LnczLm9yZy8yMDE4L2NyZWRlbnRpYWxzL3YxIl0sImlkIjoidXJuOnV1aWQ6YmFiN2JhZjAtMDY5OC00ZDM3LThjMjctNjY5Y2Y5OWJhNmY2IiwiaXNzdWVyIjoiZGlkOmtleTp6Nk1rdzNtdzcxUjJyRUxzcFpOc2hYdWVFRXpiZ2dKOEFoN3ZwWkdTaExnNGsxOEsiLCJpc3N1YW5jZURhdGUiOiIyMDIzLTA2LTMwVDEyOjQwOjQ4WiIsImlzc3VlZCI6IjIwMjMtMDYtMzBUMTI6NDA6NDhaIiwidmFsaWRGcm9tIjoiMjAyMy0wNi0zMFQxMjo0MDo0OFoiLCJleHBpcmF0aW9uRGF0ZSI6IiIsImNyZWRlbnRpYWxTY2hlbWEiOnsiaWQiOiJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vd2FsdC1pZC93YWx0aWQtc3Npa2l0LXZjbGliL21hc3Rlci9zcmMvdGVzdC9yZXNvdXJjZXMvc2NoZW1hcy9WZXJpZmlhYmxlQXR0ZXN0YXRpb24uanNvbiIsInR5cGUiOiJKc29uU2NoZW1hVmFsaWRhdG9yMjAxOCJ9LCJjcmVkZW50aWFsU3ViamVjdCI6eyJpZCI6ImRpZDprZXk6ejZNa3VIaTY4QXZpOGIzNmJoc0h1a0xUZDNKMjJRdFhRY1FmNW1YVTR6blloY1drIiwiVW5pdmVyc2l0w6AiOiJVbml2ZXJzaXTDoCBkZWdsaSBzdHVkaSBkaSBQYWRvdmEiLCJDb3JzbyI6IkluZm9ybWF0aWNhIiwiRXNhbWUiOiJDYWxjb2xvIE51bWVyaWNvIiwiRGF0YSI6IjI5LzA3LzIwMjIiLCJWb3RvIjoiMjcifSwiZXZpZGVuY2UiOnsiZG9jdW1lbnRQcmVzZW5jZSI6WyJQaGlzaWNhbCJdLCJldmlkZW5jZURvY3VtZW50IjpbIkVzYW1lIiwiQ29yZXppb25lIiwiVmVyYmFsaSJdLCJpZCI6IjEyMyIsInN1YmplY3RQcmVzZW5jZSI6WyJQaGlzaWNhbCJdLCJ0eXBlIjpbXSwidmVyaWZpZXIiOiJkaWQ6a2V5Ono2TWt3M213NzFSMnJFTHNwWk5zaFh1ZUVFemJnZ0o4QWg3dnBaR1NoTGc0azE4SyJ9fSwianRpIjoidXJuOnV1aWQ6YmFiN2JhZjAtMDY5OC00ZDM3LThjMjctNjY5Y2Y5OWJhNmY2In0.aMzTnLIRfPAfGNrHXQkG0wCiDwWmuhQXsq-e0rk58Sy3iaFVKDBGtFjGGxjG1TPUirQwGAhIsgrTHSGAfGe9BA';

      var config = {
        method: 'put',
        url: 'http://localhost:19021/credentials/urn%3Auuid%3Ad36986f1-3cc0-4156-b5a4-6d3deab84270',
        headers: { 
          'accept': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        printResponse(response,"./img/task6.jpg")
      })
      .catch(function (error) {
        console.log(error);
      });



    } catch (error) {
      console.log(error);
    }
  };

  const handleTask7 = async (e) => {
    e.preventDefault();
    try {
      var data = JSON.stringify({
        "client_name": "MyApp",
        "redirect_uris": [
          "https://myapp.com/redirect_uri"
        ],
        "all_redirect_uris": false
      });

      var config = {
        method: 'post',
        url: 'http://localhost:19051/api/oidc/clients/register',
        headers: { 
          'accept': 'application/json', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        printResponse(response,"./img/task7.jpg")
      })
      .catch(function (error) {
        console.log(error);
      });


    } catch (error) {
      console.log(error);
    }
  };

  const handleTask8 = async (e) => {
    e.preventDefault();
    try {
      var data = JSON.stringify({
        "client_name": "MyApp",
        "redirect_uris": [
          "https://myapp.com/redirect_uri"
        ],
        "all_redirect_uris": false
      });

      var config = {
        method: 'get',
        url: 'http://localhost:19051/api/oidc/clients/Iva8jP9Tmb2Qcw5GhYNjH21BeCaiIQ6OSaSVI2Fjdjg',
        headers: { 
          'Authorization': 'Bearer eyJraWQiOiI5NjE3MzgxODg5NjU0YWFkOGRiMzM5NThkZTY0NGE0MyIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJJdmE4alA5VG1iMlFjdzVHaFlOakgyMUJlQ2FpSVE2T1NhU1ZJMkZqZGpnIn0.evYoQdPQdkmOVP_dpINB9Kx-g5Yl_VmZkP0WC3W9qllBqaWrZIvb6JgAnBfpXTTOPurfZBGRhyL070L6D_L7aZtlDWlfNzC-oGUHaGJBYa0uVIXjcKcb5fUuXn4_h1NQBkoEuMGhpMSj9My6M-ZHce9Q-PPMOyQNRI7bC9SA7YnxT-X8DGBxr06icXH2X06p0W0fobpWR2bxhinrRlFQ6QTmryqzyUGdkFI47brA_-THA3qw-XrdzwlKM4hx-fFuTsPnSU9_DjdJhvmqAo6m61yj4pWLGngOQrl5pzXeyhNR88AK9Z73sySTX_9qgSVd-WIh9QFsdVo0GWPKbeHIfFHTIGdYCHeVvuqI7K07AhIE3VnnFLc4Pt94CGeHI8i8E-XTCgk85nRwnt41WP7i2s8axizjK9dlzBJF3GUd2Su8KvpHoEFahC4dERuZaHd9Pao2vqn5dZlK-4bu2XqI2wuWgNVVQgizRgZL7e6PpyJ9e8NU7juXNCeItuZIg3v4', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {
        printResponse(response,"./img/task8.jpg")
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
                <div style={{overflow: "scroll", textOverflow: "ellipsis"}}>
                <Typography variant="body2" color="text.secondary">
                  <pre>{responseLabel}</pre>
                </Typography>
                </div>
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
                1) Issuer: Create PID Template (OneTime)
              </Button> 
            </Box> 
            <Box component="form" noValidate onSubmit={handleTask2} sx={{ mt: 1 }}>  
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ mt: 3, mb: 2 }} 
              > 
                2) Issuer: Create EAA Template (OneTime)
              </Button> 
            </Box> 
            <Box component="form" noValidate onSubmit={handleTask3} sx={{ mt: 1 }}>  
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ mt: 3, mb: 2 }} 
              > 
                3) Issuer: Create DID Issuer (OneTime)
              </Button> 
            </Box>
            <Box component="form" noValidate onSubmit={handleTask4} sx={{ mt: 1 }}>  
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ mt: 3, mb: 2 }} 
              > 
                4) Wallet: Create DID Wallet
              </Button> 
            </Box> 
            <Box component="form" noValidate onSubmit={handleTask5} sx={{ mt: 1 }}>  
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ mt: 3, mb: 2 }} 
              > 
                5) Issuer: Credential Issue
              </Button> 
            </Box> 
            <Box component="form" noValidate onSubmit={handleTask6} sx={{ mt: 1 }}>  
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ mt: 3, mb: 2 }} 
              > 
                6) Issuer: Credential Store
              </Button> 
            </Box> 
            <Box component="form" noValidate onSubmit={handleTask7} sx={{ mt: 1 }}>  
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ mt: 3, mb: 2 }} 
              > 
                7) Issuer: IDP Client Registration
              </Button> 
            </Box>
            <Box component="form" noValidate onSubmit={handleTask8} sx={{ mt: 1 }}>  
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                sx={{ mt: 3, mb: 2 }} 
              > 
                8) Issuer: IDP Client Info
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
