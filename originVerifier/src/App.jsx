//Per Home
//import Blog from './blog/Blog';

import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Navbar from './components/Navbar';
import Home from './components/Home';
import useToken from './components/useToken';
import PageState from './components/PageState';
import Footer from './components/Footer';
import ConnectController from './controller/ConnectController';

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
            <Route path="/Connect"  element={<ConnectController />} />
          </Routes>
          <Footer/>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}


export default App;