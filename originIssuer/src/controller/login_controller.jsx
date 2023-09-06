import { useState } from 'react';
import LoginViewModel from '../viewmodel/login_viewmodel'; // Assumi che LoginViewModel sia stato importato correttamente
import LoginView from '../view/login_view';

const LoginController = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const viewModel = new LoginViewModel();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await viewModel.login(email, password);

    if (response.success) {
      setToken(response.token);
      alert(response.message);
      window.location.reload(true);
      window.location.href = '/home'; //prova di reindirezzamento
    } else {
      alert(response.message);
    }
  };

  return (
    <LoginView
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
};

export default LoginController;
