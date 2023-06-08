import React, { useState } from 'react';
import axios from 'axios';

function RequestCredential() {
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [requests, setRequests] = useState([]);

  const handleRetrieve = async (e) => {
    e.preventDefault();

    try {
      // Effettua la chiamata HTTP POST per recuperare le richieste utilizzando PIN e password
      const response = await axios.post('http://localhost:19101/credential/retrieve', {
        pin: pin,
        password: password
      });

      // Memorizza le richieste nella lista
      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Request Retrieval</h2>
      <form onSubmit={handleRetrieve}>
        <label>
          PIN:
          <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Retrieve Requests</button>
      </form>
      {requests.length > 0 && (
        <div>
          <h3>Retrieved Requests:</h3>
          <ul>
            {requests.map((request) => (
              <li key={request.id}>
                <p>First Name: {request.firstname}</p>
                <p>Last Name: {request.lastname}</p>
                <p>PIN: {request.pin}</p>
                <p>Password: {request.password}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RequestCredential;