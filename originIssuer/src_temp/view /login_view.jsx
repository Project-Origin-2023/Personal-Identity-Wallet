import React from 'react';
import { TextField, Button, Container } from '@mui/material';

function LoginView(props) {
  const { email, password, handleLogin, requests } = props;

  return (
    <Container>
      <h2>Effettua il login</h2>
      <form onSubmit={handleLogin}>
        <TextField label="Email">
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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

export default LoginView;
