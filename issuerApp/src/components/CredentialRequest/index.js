import PropTypes from 'prop-types';
import CredentialRequestPID from './CredentialRequestPID';

const CredentialRequest = (props) => {
    const type = props.type;
    const token = props.token;
    if(type==="PID")
        return <CredentialRequestPID token={token} />
}

CredentialRequest.propTypes = {
    type: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
};

export default CredentialRequest;