import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RequestCredential from './components/RequestCredential';
import RequestCredentialForm from './components/RequestCredentialForm';

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
              <Link to="/request">Request Credential</Link>
            </li>
            <li>
              <Link to="/getRequest">get Request Credential</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" />
          <Route path="/request" element={<RequestCredentialForm />} />
          <Route path="/getRequest" element={<RequestCredential />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
