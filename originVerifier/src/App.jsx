import { AuthProvider } from 'react-auth-kit';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Navbar from './components/Navbar';
import Home from './components/Home';
import useToken from './components/useToken';
import Footer from './components/Footer';
import ConnectController from './controller/ConnectController';
import PresentationSuccessController from './controller/PresentationSuccessController';
import ServiceIseeController from './controller/ServiceIseeController';

function App() {
  const { token, setToken } = useToken();

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
          <Navbar isLoggedIn={token!==null} setToken={setToken} />
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/Connect"  element={<ConnectController />} />
            <Route path="/success"  element={<PresentationSuccessController setToken={setToken} token={token}/>} />
            <Route path="/ServiceIsee" element={<ServiceIseeController token={token}/>} />
          </Routes>
          <Footer/>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}


export default App;