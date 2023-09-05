//Per Home
//import Blog from './blog/Blog';

import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import LoginController from './controller/login_controller';
import CredentialRequest from './components/CredentialRequest';
import ViewCredentialRequests from './components/ViewCredentialRequests';
import useToken from './components/useToken';

function App() {
  const { token, setToken } = useToken();
  
  //Routing Pagine
  return (
    <Router>
      <AuthProvider>
        <Navbar isLoggedIn={token!==null} setToken={setToken}/>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<LoginController setToken={setToken} />} />
          <Route path="/CredentialRequestPID" element={<CredentialRequest type="PID" token={token} />} />
          <Route path="/ViewCredentialRequests" element={<ViewCredentialRequests type="ALL" token={token}/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}


export default App;