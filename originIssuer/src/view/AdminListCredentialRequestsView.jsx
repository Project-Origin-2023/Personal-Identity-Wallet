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
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';

const AdminListCredentialRequestsView = ({ vcs_requestsPending, vcs_requestsNoPending}) => {
 return(
  <Container maxWidth="lg">
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
              <TableCell>id</TableCell>
              <TableCell align="right">applicant</TableCell>
              <TableCell align="right">released</TableCell>
              <TableCell align="right">Verify</TableCell>
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
              <TableCell>id</TableCell>
              <TableCell align="right">applicant</TableCell>
              <TableCell align="right">released</TableCell>
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

AdminListCredentialRequestsView.propTypes = {
  vcs_requestsPending: PropTypes.array.isRequired,
  vcs_requestsNoPending: PropTypes.array.isRequired,
};

export default AdminListCredentialRequestsView;
