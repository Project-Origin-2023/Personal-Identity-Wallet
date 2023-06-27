import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import RequestCredential from './components/RequestCredential';
<<<<<<< Updated upstream
=======
import CredentialViewAll from './components/CredentialViewAll';
>>>>>>> Stashed changes
import LogoutButton from './components/LogoutButton';
import useToken from './components/useToken';

function App() {
  const { token, setToken } = useToken();

  //OBBLIGA A FARE IL login
  /*
  if(!token) {
    return <Login setToken={setToken} />
  }
  */

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Register">Registrati</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/RequestCredential">Richiesta di credenziale</Link>
<<<<<<< Updated upstream
=======
            </li>
            <li>
              <Link to="/CredentialViewAll">Visualizzazione credenziale</Link>
>>>>>>> Stashed changes
            </li>
            <LogoutButton />
          </ul>
        </nav>

        <Routes>
          <Route path="/" />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login setToken={setToken} />} />
          <Route path="/RequestCredential" element={<RequestCredential />} />
<<<<<<< Updated upstream
=======
          <Route path="/CredentialViewAll" element={<CredentialViewAll />} />
>>>>>>> Stashed changes
        </Routes>
      </div>
    </Router>
  );
}

export default App;
