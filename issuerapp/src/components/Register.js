import React, { useState } from 'react';
import axios from 'axios';

function Register(){
    const [familyName, setFamilyName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [requests, setRequests] = useState([]);
    //const [confirmPassword, setConfirmPassword] = useState(''); chatgpt merda

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Effettua la chiamata HTTP POST per inviare i dati di registrazione
        const response = await axios.post('http://localhost:19101/register', { //dovrà essere creato questo endpoint
            familyName: familyName,
            firstName: firstName,
            email: email,
            password: password
        });

      setRequests(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div>
      <h1>Registrazione</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Cognome:</label>
          <input
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrati</button>
      </form>
    </div>
    /*{response && (
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
      )}*/
    );
}
export default Register;