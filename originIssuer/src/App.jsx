
import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import CredentialRequest from './components/CredentialRequest';
import ViewCredentialRequests from './components/ViewCredentialRequests';
import useToken from './components/useToken';
import LoginView from './view/login_view';
import RegisterView from './view/register_view'

function App() {
  const { token, setToken } = useToken();

  // Routing Pagine
  return (
    <Router>
      <AuthProvider>
        <Navbar isLoggedIn={token !== null} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<RegisterView />} />
          <Route
            path="/Login"
            element={<LoginView  />} // Assicurati che setToken sia passato qui
          />
          <Route
            path="/CredentialRequestPID"
            element={<CredentialRequest type="PID" token={token} />}
          />
          <Route
            path="/ViewCredentialRequests"
            element={<ViewCredentialRequests type="ALL" token={token} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
