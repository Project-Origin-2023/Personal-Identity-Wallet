//Per Home
//import Blog from './blog/Blog';

import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import Navbar from './components/Navbar';
import Home from './components/Home';
import RegisterController from './controller/register_controller'
import LoginController from './controller/login_controller';
//import CredentialRequest from './components/CredentialRequest';
import ViewCredentialRequestsController from './controller/credentialRequest_controller';
import ViewCredentialRequests from './components/ViewCredentialRequests';
import CredentialRequestPIDController from './controller/request_pid_controller';
import CredentialRequestMaritalController from './controller/request_marital_controller';
import CredentialReleaseController from './controller/credentialRelease_controller';
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
          <Route path="/Register" element={<RegisterController setToken={setToken}/>} />
          <Route path="/Login" element={<LoginController setToken={setToken} />} />
          <Route path="/CredentialRequestPID" element={<CredentialRequestPIDController token={token} />} />
          <Route path="/CredentialRequestMarital" element={<CredentialRequestMaritalController token={token} />} />
          <Route path="/ViewCredentialRequests" element={<ViewCredentialRequestsController type="ALL" token={token}/>} />
          <Route path="/CredentialRelease" element={<CredentialReleaseController token={token}/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}


export default App;