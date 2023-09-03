// CredentialView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, styled } from '@mui/material';

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
  backgroundColor: '#f5f5f5',
});

const TableBody = styled('tbody')({
  '& tr:nth-child(even)': {
    backgroundColor: '#f9f9f9',
  },
});

const CredentialView = ({ selectedRecord, onSelectRecord, credentialData, onBackButtonClick }) => {
  const getStatusText = (status) => {
    if (status === 0) {
      return 'In Revisione';
    } else if (status === 1) {
      return 'Approvata';
    } else if (status === 2) {
      return 'Rifiutata';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <ViewRequestsContainer>
      <Title variant="h6">Visualizzazione Credenziale</Title>
      {selectedRecord ? (
        <RecordContainer>
          {Object.entries(selectedRecord).map(([key, value]) => {
            if (key !== 'user_id') {
              return (
                <p key={key}>
                  <strong>{key}:</strong>{' '}
                  {key === 'status'
                    ? getStatusText(value)
                    : key === 'date_of_birth'
                    ? formatDate(value)
                    : value}
                </p>
              );
            }
            return null;
          })}
          <BackButton onClick={onBackButtonClick}>Indietro</BackButton>
        </RecordContainer>
      ) : (
        <>
          {credentialData.length > 0 ? (
            <Table>
              <TableHead>
                <tr>
                  <th>Data di nascita</th>
                  <th>Cognome</th>
                  <th>Nome</th>
                  <th>Dettagli</th>
                </tr>
              </TableHead>
              <TableBody>
                {credentialData.map((rowData, index) => (
                  <tr key={index}>
                    <td>{formatDate(rowData.date_of_birth)}</td>
                    <td>{rowData.family_name}</td>
                    <td>{rowData.first_name}</td>
                    <td>
                      <Button onClick={() => onSelectRecord(rowData)} variant="text">
                        Visualizza dettagli
                      </Button>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Caricamento dati credenziali...</p>
          )}
        </>
      )}
    </ViewRequestsContainer>
  );
};

CredentialView.propTypes = {
  selectedRecord: PropTypes.object,
  onSelectRecord: PropTypes.func.isRequired,
  credentialData: PropTypes.array.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
};

export default CredentialView;
