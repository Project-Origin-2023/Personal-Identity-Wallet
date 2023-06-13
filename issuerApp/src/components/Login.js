import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container} from '@mui/material';

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
        console.log(response);
        // Memorizza le richieste nella lista
        setRequests(response.data);
        if (response.data.email) {
          window.sessionStorage.setItem("user", JSON.stringify(response.data));
        }
      } catch (error) {
        console.log(error);
      }
  }; 

  return (
    <Container>
      <h2>Effettua il login</h2>
      <form onSubmit={handleLogin}>
        <TextField label="Email">
          <input type="text" value={email}  onChange={(e) => setEmail(e.target.value)} />
        </TextField>
        <br />
        <TextField label="Password">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </TextField>
        <br />
        <Button type="submit">Accedi</Button>
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
    </Container>
  );
}

export default Login;