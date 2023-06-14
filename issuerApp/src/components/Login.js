import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


function Login ({ setToken }){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Esegui l'elaborazione dell'accesso qui, ad esempio inviando i dati al server
    try {
        // Effettua la chiamata HTTP POST per recuperare le richieste utilizzando email e password
        const response = await axios.post('http://localhost:19101/Login', {
          email: email,
          password: password
        });

        if (response.data.success){
          setToken(response.data.token);
          alert(response.data.message);
        }

      } catch (error) {
        console.log(error);
      }
  };

  

  return (
    <div>
      <h2>Effettua il login</h2>
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
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;