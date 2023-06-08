import React, { useState } from 'react';
import axios from 'axios';

function Login (){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requests, setRequests] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Esegui l'elaborazione dell'accesso qui, ad esempio inviando i dati al server
    try {
        // Effettua la chiamata HTTP POST per recuperare le richieste utilizzando email e password
        const response = await axios.post('http://localhost:19101/login', {
          email: email,
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
      <h2>Richiesta credenziali</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="text" value={email}  onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Accedi</button>
      </form>
      {requests.length > 0 && (
        <div>
          <h3>Retrieved Requests:</h3>
          <ul>
            {requests.map((request) => (
              <li key={request.id}>
                <p>Email: {request.email}</p>
                <p>Password: {request.password}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Login;