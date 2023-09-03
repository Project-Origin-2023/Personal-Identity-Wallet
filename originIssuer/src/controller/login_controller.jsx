import { useState } from 'react';
import axios from 'axios';
import LoginModel from '../model/login_model'; // Assicurati che il tuo percorso sia corretto
import LoginView from '../view/login_view'; // Assicurati che il tuo percorso sia corretto
import PropTypes from 'prop-types';

const LoginController = ({ setToken }) => {
  const [model] = useState(new LoginModel());

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://api.issuer.origin/auth/login', {
        email: model.getEmail(),
        password: model.getPassword(),
      });

      if (response.data.success) {
        setToken(response.data.token);
        alert(response.data.message);
        window.location.reload(true);
        window.location.href = '/';
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginView
      email={model.getEmail()}
      password={model.getPassword()}
      setEmail={model.setEmail.bind(model)}
      setPassword={model.setPassword.bind(model)}
      handleLogin={handleLogin}
    />
  );
};

LoginController.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default LoginController;
