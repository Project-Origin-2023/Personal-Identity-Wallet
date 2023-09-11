import { useState } from 'react';
import LoginViewModel from '../viewmodel/LoginViewModel'; 
import LoginView from '../view/LoginView';

const LoginController = ({ setToken , setIsAdmin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const viewModel = new LoginViewModel();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await viewModel.login(email, password);
    alert(response.description);
    if (response.success) {
      //verify account sys admin
      setIsAdmin(response.data.isAdmin);
      //set token
      setToken(response.data.token);
      window.location.reload(true);
      window.location.href = '/'
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
