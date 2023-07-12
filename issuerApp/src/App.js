//Per Home
//import Blog from './blog/Blog';

import React from 'react';
import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import RequestCredential from './components/RequestCredential';
import ViewCredentialRequest from './components/ViewCredentialRequest';
import useToken from './components/useToken';

function App() {
  const { token, setToken } = useToken();
  
  //Routing Pagine
  return (
    <Router>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/"  element={<Register />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login setToken={setToken} />} />
          <Route path="/RequestCredential" element={<RequestCredential />} />
          <Route path="/ViewCredentialRequest" element={<ViewCredentialRequest />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}


export default App;