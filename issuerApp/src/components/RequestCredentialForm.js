import React, { useState } from 'react';
import axios from 'axios';

function RequestCredentialForm() {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Genera casualmente il PIN e la password
      const generatedPin = generateRandomPin();
      const generatedPassword = generateRandomPassword();

      // Effettua la chiamata HTTP POST per inviare la richiesta di credenziale
      const response = await axios.post('http://localhost:19101/credential/request', {
        firstname: firstname,
        lastname: lastname,
        pin: generatedPin,
        password: generatedPassword
      });

      // Mostra il PIN e la password all'utente
      setPin(generatedPin);
      setPassword(generatedPassword);

      // Memorizza la risposta del server
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Funzione per generare un PIN casuale
  const generateRandomPin = () => {
    // Logica per generare un PIN casuale
    // Esempio: Genera un numero a 4 cifre tra 1000 e 9999
    return Math.floor(Math.random() * 9000) + 1000;
  };

  // Funzione per generare una password casuale
  const generateRandomPassword = () => {
    // Logica per generare una password casuale
    // Esempio: Genera una stringa di 8 caratteri casuali
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  };

  return (
    <div>
      <h1>Credential Request</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstname} onChange={(e) => setfirstname(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastname} onChange={(e) => setlastname(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>Success: {response.success}</p>
          {response.success && (
            <div>
              <p>PIN: {pin}</p>
              <p>Password: {password}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RequestCredentialForm;



