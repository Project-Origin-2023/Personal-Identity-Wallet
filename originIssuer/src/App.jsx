//Per Home
//import Blog from './blog/Blog';

import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import Navbar from './components/Navbar';
import Home from './components/Home';
import RegisterController from './controller/RegisterController'
import LoginController from './controller/LoginController';
import ListCredentialRequestsController from './controller/ListCredentialRequestsController';
import CredentialRequestPIDController from './controller/CredentialRequestPIDController';
import CredentialRequestMaritalController from './controller/CredentialRequestMaritalController';
import DetailCredentialRequestPIDController from './controller/DetailCredentialRequestPIDController'
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
          <Route path="/ListCredentialRequests" element={<ListCredentialRequestsController token={token}/>} />
          <Route path="/DetailsCredentialRequestPID" element={<DetailCredentialRequestPIDController token={token}/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}


export default App;