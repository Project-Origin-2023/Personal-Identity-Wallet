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
import CredentialRequestController from './controller/CredentialRequestController';
import InitiateIssuanceController from './controller/InitiateIssuanceController';
import StartIssuerInitiatedIssuanceController from './controller/StartIssuerInitiatedIssuanceController';
import StartPresentationController from './controller/StartPresentationController';
import useToken from './components/useToken';
import PageState from './components/PageState';
import Footer from './components/Footer';

function App() {
  const { token, setToken } = useToken();

  const state = new PageState()
  
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  //Routing Pagine
  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <AuthProvider>
          <Navbar setToken={setToken} state={state}/>
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/ListCredentials" element={<ListCredentialsController token={token} setToken={setToken} state={state} />} />
            </Routes>
          <Footer/>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}


export default App;