import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CredentialViewOne() {
  const [credentialData, setCredentialData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:19101/View');
        setCredentialData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
  };

  const getStatusText = (status) => {
    return status ? 'Attivo' : 'Inattivo';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h2>Visualizzazione Credenziale</h2>
      {selectedRecord ? (
        <div>
          {Object.entries(selectedRecord).map(([key, value]) => {
            if (key !== 'user_fk') {
              return (
                <p key={key}>
                  <strong>{key}:</strong> {key === 'status' ? getStatusText(value) : key === 'dateofbirth' ? formatDate(value) : value}
                </p>
              );
            }
            return null;
          })}
          <button onClick={() => setSelectedRecord(null)}>Indietro</button>
        </div>
      ) : (
        <>
          {credentialData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Data di nascita</th>
                  <th>Cognome</th>
                  <th>Nome</th>
                  <th>Dettagli</th>
                </tr>
              </thead>
              <tbody>
                {credentialData.map((rowData, index) => (
                  <tr key={index}>
                    <td>{formatDate(rowData.dateofbirth)}</td>
                    <td>{rowData.familyname}</td>
                    <td>{rowData.firstname}</td>
                    <td>
                      <button onClick={() => handleRecordClick(rowData)}>
                        Visualizza dettagli
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Caricamento dati credenziali...</p>
          )}
        </>
      )}
    </div>
  );
}

export default CredentialViewOne;