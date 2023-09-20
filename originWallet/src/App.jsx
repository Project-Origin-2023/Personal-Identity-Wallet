import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
          <Navbar isLoggedIn={token!==null} setToken={setToken} state={state}/>
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/Register" element={<RegisterController setToken={setToken} state={state}/>} />
            <Route path="/Login" element={<LoginController setToken={setToken} state={state}/>} />
            <Route path="/ListCredentials" element={<ListCredentialsController token={token} setToken={setToken} state={state} />} />
            <Route path="/DetailCredential" element={<DetailCredentialController token={token} setToken={setToken} state={state} />} />
            <Route path="/CredentialRequest" element={<CredentialRequestController token={token} setToken={setToken} state={state} />} />
            <Route path="/InitiateIssuance" element={<InitiateIssuanceController token={token} setToken={setToken} state={state} />} />
            <Route path="/StartIssuerInitiatedIssuance" element={<StartIssuerInitiatedIssuanceController token={token} setToken={setToken} state={state} />} />
            <Route path="/StartPresentation" element={<StartPresentationController token={token} setToken={setToken} state={state} />} />
          </Routes>
          <Footer/>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}


export default App;