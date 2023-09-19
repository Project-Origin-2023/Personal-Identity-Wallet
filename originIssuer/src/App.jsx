//Per Home
//import Blog from './blog/Blog';

import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';


import Navbar from './components/Navbar';
import Home from './components/Home';
import RegisterController from './controller/RegisterController'
import LoginController from './controller/LoginController';
import AdminListCredentialRequestsController from './controller/AdminListCredentialRequestsController';
import AdminVerifyCredentialRequestController from './controller/AdminVerifyCredentialRequestController'
import ListCredentialRequestsController from './controller/ListCredentialRequestsController';
import CredentialRequestPIDController from './controller/CredentialRequestPIDController';
import CredentialRequestMaritalController from './controller/CredentialRequestMaritalController';
import DetailCredentialRequestPIDController from './controller/DetailCredentialRequestPIDController'
import DetailCredentialRequestMaritalController from './controller/DetailCredentialRequestMaritalController'
import useToken from './components/useToken';
import Footer from './components/Footer';

function App() {
  const { token, setToken , isAdmin, setIsAdmin} = useToken();

  

  //Routing Pagine
  return (
    <Router>
      <AuthProvider>
        <Navbar isAdmin={isAdmin} isLoggedIn={token!==null} setIsAdmin={setIsAdmin} setToken={setToken}/>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/Register" element={<RegisterController setToken={setToken}/>} />
          <Route path="/Login" element={<LoginController setToken={setToken} setIsAdmin={setIsAdmin}/>} />
          <Route path="/CredentialRequestPID" element={<CredentialRequestPIDController token={token} />} />
          <Route path="/CredentialRequestMarital" element={<CredentialRequestMaritalController token={token} />} />
          <Route path="/AdminListCredentialRequests" element={<AdminListCredentialRequestsController token={token}/>} />
          <Route path="/AdminVerifyCredentialRequest" element={<AdminVerifyCredentialRequestController token={token}/>} />
          <Route path="/ListCredentialRequests" element={<ListCredentialRequestsController token={token}/>} />
          <Route path="/DetailCredentialRequestPID" element={<DetailCredentialRequestPIDController token={token}/>} />
          <Route path="/DetailCredentialRequestMarital" element={<DetailCredentialRequestMaritalController token={token}/>} />
        </Routes>
        <Footer/>
      </AuthProvider>
    </Router>
  );
}


export default App;