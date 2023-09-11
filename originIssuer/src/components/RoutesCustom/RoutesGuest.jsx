import { BrowserRouter as Routes, Route, Router} from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import PropTypes from 'prop-types';
import Home from '../../components/Home';
import RegisterController from '../../controller/RegisterController'
import LoginController from '../../controller/LoginController';

function RoutesGuest(props) {
    const setToken = props.setToken;
    return (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path="/"  element={<Home />} />
                <Route path="/Register" element={<RegisterController setToken={setToken}/>} />
                <Route path="/Login" element={<LoginController setToken={setToken} />} />
            </Routes>
        </AuthProvider>
    </Router>
    );
}


RoutesGuest.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default RoutesGuest;