import PropTypes from 'prop-types';
import { Typography, Button, styled } from '@mui/material';
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



const ListCredentialRequestsView = ({ vcs_requestsPID, vcs_requestsMarital}) => {
 return(
  <Container maxWidth="lg">
    <Typography
      component="h1"
      variant="h5"
      color="black"
      noWrap
    >Visualizzazione Richieste Verifiable Credentials PID</Typography>
    {vcs_requestsPID.length > 0 ? (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">familyName</TableCell>
              <TableCell align="right">firstName</TableCell>
              <TableCell align="right">Dettagli</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vcs_requestsPID.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell align="right">{row.familyName}</TableCell>
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">
                  <Button color="inherit" component={Link} to={'/DetailCredentialRequestPID?id=' + row.id}>Dettaglio</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ):(
      <p>Caricamento dati credenziali...</p>
    )}
    <Typography
      component="h1"
      variant="h5"
      color="black"
      noWrap
    >Visualizzazione Richieste Verifiable Credentials Marital Status</Typography>
    {vcs_requestsMarital.length > 0 ? (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">personalIdentifier</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">Dettagli</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vcs_requestsMarital.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell align="right">{row.personalIdentifier}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <Button color="inherit" component={Link} to={'/DetailCredentialRequestMarital?id=' + row.id}>Dettaglio</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ):(
      <p>Caricamento dati credenziali...</p>
    )}
  </Container>
  );
};

ListCredentialRequestsView.propTypes = {
  vcs_requestsPID: PropTypes.array.isRequired,
  vcs_requestsMarital: PropTypes.array.isRequired,
};

export default ListCredentialRequestsView;
