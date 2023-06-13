import React from 'react';
import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import RequestCredentialForm from './components/RequestCredentialForm';
import RequestCredential from './components/RequestCredential';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Registrati</Link>
            </li>
            <li>
              <Link to="/request">Request Credential</Link>
            </li>
            <li>
              <Link to="/getRequest">get Request Credential</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/Logout">Logout</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" />
          <Route path="/register" element={<Register />} />
          <Route path="/request" element={<RequestCredentialForm />} />
          <Route path="/getRequest" element={<RequestCredential />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Logout" element={<Logout />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
