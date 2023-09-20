import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

const PresentationSuccessView = ({presentationInfo,handleContinueConnect}) => {
  return (
    <Container component="main" maxWidth="md">
        <Grid sx={{pt: 8,pb: 6,}} 
        container
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center">
            <Grid item xs={12}>
              <Button
              onClick={()=>{handleContinueConnect(presentationInfo.auth_token)}}
              fullWidth
              variant="contained"
              color="primary"
              >
                Continua Connect
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">Esito Presentazione : {presentationInfo.isValid ? (<CheckCircleOutlineIcon/>):(<DoDisturbIcon/>)}</Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography variant="h4">Informazioni:</Typography>
              <Typography variant="body2">
                <strong>subject: </strong> {presentationInfo.subject }
              </Typography> 
              <Typography variant="body2">
                <strong>state: </strong> {presentationInfo.state }
              </Typography> 
            </Grid>
            <Grid item md={12} xs={12}>
              {presentationInfo.vps.map((vp, index) => (
                <Grid item md={12} xs={12}>
                    <Typography variant="h6">Presentazione:</Typography>
                    <Typography variant="body2">
                      <strong>Holder: </strong> {vp.vp.holder}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Id: </strong> {vp.vp.id}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Type: </strong> {vp.vp.type}
                    </Typography>
                    <Typography variant="h6">Verification:</Typography>
                    <Typography variant="body2">
                      <strong>Result: </strong> {vp.verification_result.result ? (<CheckCircleOutlineIcon/>):(<DoDisturbIcon/>)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Valid: </strong> {vp.verification_result.valid ? (<CheckCircleOutlineIcon/>):(<DoDisturbIcon/>)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>ChallengePolicy: </strong> {vp.verification_result.policyResults.ChallengePolicy.isSuccess ? (<CheckCircleOutlineIcon/>):(<DoDisturbIcon/>)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>PresentationDefinitionPolicy: </strong> {vp.verification_result.policyResults.PresentationDefinitionPolicy.isSuccess ? (<CheckCircleOutlineIcon/>):(<DoDisturbIcon/>)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>SignaturePolicy: </strong> {vp.verification_result.policyResults.SignaturePolicy.isSuccess ? (<CheckCircleOutlineIcon/>):(<DoDisturbIcon/>)}
                    </Typography>
                    {vp.vcs.map((vc, index) => (
                      <Card>
                        <CardContent>
                          <Grid item md={6} xs={12}>
                            <Typography variant="h6">Credenziale Offerta:</Typography>
                            <Typography variant="body1">
                              <strong>issuanceDate:</strong> {new Date(vc.issuanceDate).toUTCString()}
                            </Typography>
                            <Typography variant="body1">
                              <strong>issued:</strong> {new Date(vc.issued).toUTCString()}
                            </Typography>
                            <Typography variant="body1">
                              <strong>validFrom:</strong> {new Date(vc.validFrom).toUTCString()}
                            </Typography>
                            <Typography variant="body1">
                              <strong>Expiration Date:</strong> {new Date(vc.expirationDate).toUTCString()}
                            </Typography>
                          </Grid>
                          <Grid item md={8} xs={12}>
                                {Object.keys(vc.credentialSubject).map((key)=>{
                                  return (<Typography variant="body1">
                                  <strong>{key}: </strong> {vc.credentialSubject[key]}
                                  </Typography>)
                                })}
                          </Grid>
                        </CardContent>
                      </Card>
                    ))}
                </Grid>
              ))}
            </Grid>       
        </Grid>
    </Container>
      
  );
};


export default PresentationSuccessView;
