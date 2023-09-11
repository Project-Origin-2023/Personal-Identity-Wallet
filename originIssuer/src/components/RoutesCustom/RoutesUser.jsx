import { BrowserRouter as Routes, Route, Router} from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import PropTypes from 'prop-types';
import Home from '../../components/Home';
import ListCredentialRequestsController from '../../controller/ListCredentialRequestsController';
import CredentialRequestPIDController from '../../controller/CredentialRequestPIDController';
import CredentialRequestMaritalController from '../../controller/CredentialRequestMaritalController';
import DetailCredentialRequestPIDController from '../../controller/DetailCredentialRequestPIDController'
import DetailCredentialRequestMaritalController from '../../controller/DetailCredentialRequestMaritalController'

function RoutesUser(props) {

const token = props.token;

return (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path="/"  element={<Home />} />
                <Route path="/CredentialRequestPID" element={<CredentialRequestPIDController token={token} />} />
                <Route path="/CredentialRequestMarital" element={<CredentialRequestMaritalController token={token} />} />
                <Route path="/ListCredentialRequests" element={<ListCredentialRequestsController token={token}/>} />
                <Route path="/DetailCredentialRequestPID" element={<DetailCredentialRequestPIDController token={token}/>} />
                <Route path="/DetailCredentialRequestMarital" element={<DetailCredentialRequestMaritalController token={token}/>} />
            </Routes>
        </AuthProvider>
    </Router>
    );
}


RoutesUser.propTypes = {
    token: PropTypes.string.isRequired
};

export default RoutesUser;