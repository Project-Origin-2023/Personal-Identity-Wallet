import PropTypes from 'prop-types';

export default function authHeader({getToken}) {
    const email = JSON.parse(sessionStorage.getItem('email'));
  
    if (email && email.accessToken) {
        // for Node.js Express back-end
        return { 'x-access-token': getToken() };
    } else {
        return {};
    }
  }

  Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }