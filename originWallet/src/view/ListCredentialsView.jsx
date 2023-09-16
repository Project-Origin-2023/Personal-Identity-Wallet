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



const ListCredentialsView = ({ credentials }) => {
 return(
  <Container maxWidth="lg">
    <Typography
      component="h1"
      variant="h5"
      color="black"
      noWrap
    >Visualizzazione Verifiable Credentials</Typography>
    {credentials.length > 0 ? (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Issuance Date</TableCell>
              <TableCell align="right">Dettagli</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {credentials.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell align="right">{row.type.join('-')}</TableCell>
                <TableCell align="right">{new Date(row.issuanceDate).toUTCString()}</TableCell>
                <TableCell align="right">
                  <Button color="inherit" component={Link} to={'/DetailCredential'} state={{credential:row}}>Dettaglio</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ):(
      <p>Ancora nessun dato da mostrare ...</p>
    )}
  </Container>
  );
};

ListCredentialsView.propTypes = {
  credentials: PropTypes.array.isRequired,
};

export default ListCredentialsView;
