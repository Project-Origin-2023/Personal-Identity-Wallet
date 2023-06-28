import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CredentialView() {
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
    return status ? 'Active' : 'Inactive'; //True : False
  };

  return (
    <div>
      <h2>Visualizzazione credenziali</h2>
      {selectedRecord ? (
        <div>
          {Object.entries(selectedRecord).map(([key, value]) => {
            if (key !== 'personalidfk') { //non vogliamo mostrare la foreign key
              return (
                <p key={key}>
                  <strong>{key}:</strong> {key === 'status' ? getStatusText(value) : value}
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
                  <th>Date of Birth</th>
                  <th>Family Name</th>
                  <th>First Name</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {credentialData.map((rowData, index) => (
                  <tr key={index}>
                    <td>{rowData.dateofbirth}</td>
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
            <p>Caricamento ...</p>
          )}
        </>
      )}
    </div>
  );
}

export default CredentialView;