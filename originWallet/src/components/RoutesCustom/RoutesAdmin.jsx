import { BrowserRouter as Routes, Route, Router} from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import PropTypes from 'prop-types';
import Home from '../../components/Home';

function RoutesAdmin(props) {
    const token = props.token;
return (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path="/"  element={<Home />} />
            </Routes>
        </AuthProvider>
    </Router>
    );
}


Routes.propTypes = {
    token: PropTypes.string.isRequired
};

export default RoutesAdmin;