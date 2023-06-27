import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CredentialViewOne() {
  const [credentialData, setCredentialData] = useState([]);

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

  return (
    <div>
      <h2>Credential View</h2>
      {credentialData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date of Birth</th>
              <th>Family Name</th>
              <th>First Name</th>
              <th>Gender</th>
              <th>Name and Family Name at Birth</th>
              <th>Place of Birth</th>
            </tr>
          </thead>
          <tbody>
            {credentialData.map((rowData, index) => (
              <tr key={index}>
                <td>{rowData.dateofbirth}</td>
                <td>{rowData.familyname}</td>
                <td>{rowData.firstname}</td>
                <td>{rowData.gender}</td>
                <td>{rowData.nameandfamilynameatbirth}</td>
                <td>{rowData.placeobirth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading credential data...</p>
      )}
    </div>
  );
}

export default CredentialViewOne;
