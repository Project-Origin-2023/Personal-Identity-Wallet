//Per Home
//import Blog from './blog/Blog';

import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Navbar from './components/Navbar';
import Home from './components/Home';
import RegisterController from './controller/RegisterController'
import LoginController from './controller/LoginController';
import ListCredentialsController from './controller/ListCredentialsController';
import DetailCredentialController from './controller/DetailCredentialController'
import InitiateIssuanceController from './controller/InitiateIssuanceController';
import useToken from './components/useToken';

function App() {
  const { token, setToken , isAdmin, setIsAdmin} = useToken();

  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  //Routing Pagine
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <AuthProvider>
          <Navbar isAdmin={isAdmin} isLoggedIn={token!==null} setIsAdmin={setIsAdmin} setToken={setToken}/>
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/Register" element={<RegisterController setToken={setToken}/>} />
            <Route path="/Login" element={<LoginController setToken={setToken} setIsAdmin={setIsAdmin}/>} />
            <Route path="/ListCredentials" element={<ListCredentialsController token={token} setToken={setToken}/>} />
            <Route path="/DetailCredential" element={<DetailCredentialController token={token} setToken={setToken}/>} />
            <Route path="/InitiateIssuance" element={<InitiateIssuanceController token={token} setToken={setToken}/>} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}


export default App;