import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

const AdminListCredentialRequestsView = ({ vcs_requestsPending, vcs_requestsNoPending}) => {
 return(
  <Container maxWidth="lg">
    <Grid sx={{pt: 8,pb: 6,}} 
      container
      spacing={2}
      direction="row"
      justifyContent="space-evenly"
      alignItems="center">
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h5"
          color="black"
          noWrap
        >Visualizzazione Richieste Verifiable in Pending (Da Revisionare)</Typography>
        {vcs_requestsPending.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>VC Request Id</strong></TableCell>
                  <TableCell align="right"><strong>Applicant email</strong></TableCell>
                  <TableCell align="right"><strong>Released by Applicant</strong></TableCell>
                  <TableCell align="right"><strong>Verify</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vcs_requestsPending.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">{row.applicant}</TableCell>
                    <TableCell align="right">{row.released ? (<CheckSharpIcon></CheckSharpIcon>) : (<HighlightOffSharpIcon></HighlightOffSharpIcon>)}</TableCell>
                    <TableCell align="right">
                      <Button color="inherit" component={Link} to={'/AdminVerifyCredentialRequest?id=' + row.id}>Verify</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ):(
          <p>Caricamento dati credenziali...</p>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h5"
          color="black"
          noWrap
        >Visualizzazione Richieste Verifiable Credentials Not Pending (Revisionate)</Typography>
        {vcs_requestsNoPending.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>VC Request Id</strong></TableCell>
                  <TableCell align="right"><strong>Applicant email</strong></TableCell>
                  <TableCell align="right"><strong>Released by Applicant</strong></TableCell>
                  <TableCell align="right"><strong>Verification Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vcs_requestsNoPending.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell align="right">{row.applicant}</TableCell>
                    <TableCell align="right">{row.released ? (<CheckSharpIcon></CheckSharpIcon>) : (<HighlightOffSharpIcon></HighlightOffSharpIcon>)}</TableCell>
                    <TableCell align="right">{row.status ? (<CheckSharpIcon></CheckSharpIcon>) : (<HighlightOffSharpIcon></HighlightOffSharpIcon>)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ):(
          <p>Caricamento dati credenziali...</p>
        )}
      </Grid>
    </Grid>
  </Container>
  );
};

export default AdminListCredentialRequestsView;
