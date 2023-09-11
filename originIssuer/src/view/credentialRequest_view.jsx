import PropTypes from 'prop-types';
import { Typography, Button, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const ViewRequestsContainer = styled('div')({
  textAlign: 'center',
});

const Title = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '24px',
  marginBottom: '16px',
});

const RecordContainer = styled('div')({
  marginBottom: '16px',
});

const BackButton = styled(Button)({
  backgroundColor: 'transparent',
  border: 'none',
  textDecoration: 'underline',
  cursor: 'pointer',
});

const Table = styled('table')({
  margin: '0 auto',
  borderCollapse: 'collapse',
  width: '100%',
});

const TableHead = styled('thead')({
  backgroundColor: 'black',
});

const TableBody = styled('tbody')({
  '& tr:nth-child(even)': {
    backgroundColor: 'black',
  },
});


const ViewCredentialRequestsView = ({ vcs_requestsPID, vcs_requestsMarital}) => {
 return(
  <ViewRequestsContainer>
    <Title variant="h6">Visualizzazione Richieste Verifiable Credentials PID</Title>
    {vcs_requestsPID.length > 0 ? (
      <Table>
        <TableHead>
          <tr>
            <th>ID</th>
            <th>familyName</th>
            <th>firstName</th>
            <th>Dettagli</th>
          </tr>
        </TableHead>
        <TableBody>
          {vcs_requestsPID.map((rowData, index) => (
            <tr key={index}>
              <td>{rowData.id}</td>
              <td>{rowData.familyName}</td>
              <td>{rowData.firstName}</td>
              <td>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button color="inherit" component={Link} to={'/ViewCredentialRequestPID?id=' + rowData.id}>Dettaglio</Button>
                </Grid>
              </Grid>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>
    ):(
      <p>Caricamento dati credenziali...</p>
    )}
    <Title variant="h6">Visualizzazione Richieste Verifiable Credentials Marital Status</Title>
    {vcs_requestsMarital.length > 0 ? (
      <Table>
        <TableHead>
          <tr>
            <th>ID</th>
            <th>personalIdentifier</th>
            <th>status</th>
            <th>Dettagli</th>
          </tr>
        </TableHead>
        <TableBody>
          {vcs_requestsMarital.map((rowData, index) => (
            <tr key={index}>
              <td>{rowData.id}</td>
              <td>{rowData.personalIdentifier}</td>
              <td>{rowData.status}</td>
              <td>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button color="inherit" component={Link} to={'/ViewCredentialRequestMarital?id=' + rowData.id}>Dettaglio</Button>
                </Grid>
              </Grid>
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>
    ):(
      <p>Caricamento dati credenziali...</p>
    )}
  </ViewRequestsContainer>
  );
};

ViewCredentialRequestsView.propTypes = {
  vcs_requestsPID: PropTypes.array.isRequired,
  vcs_requestsMarital: PropTypes.array.isRequired,
};

export default ViewCredentialRequestsView;
