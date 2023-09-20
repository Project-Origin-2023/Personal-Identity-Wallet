import { Typography, Button, styled } from '@mui/material';
import { Link } from 'react-router-dom';
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
  <Container maxWidth="md"
      spacing={2}
      direction="row"
      justifyContent="space-evenly"
      alignItems="center">
    <Typography
      component="h1"
      variant="h4"
      color="black"
      noWrap
    >Visualizzazione Lista Verifiable Credentials</Typography>
    <Typography variant="caption">Di seguito si puo' visualizzare la lista con tutte le tue credenziali salvate nel Wallet</Typography>
    {credentials.length > 0 ? (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell align="right"><strong>Type</strong></TableCell>
              <TableCell align="right"><strong>Issuance Date</strong></TableCell>
              <TableCell align="right"><strong>Dettagli</strong></TableCell>
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
      <Typography
      component="h1"
      variant="h4"
      color="black"
      noWrap
      >Ancora nessun dato da mostrare ...</Typography>
    )}
  </Container>
  );
};

export default ListCredentialsView;
