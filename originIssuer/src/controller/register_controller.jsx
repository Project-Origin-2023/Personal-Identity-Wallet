import { useState } from 'react';
import RegisterViewModel from '../viewmodel/register_viewmodel'; // Assumi che LoginViewModel sia stato importato correttamente
import RegisterView from '../view/register_view.jsx';


const RegisterController = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const viewModel = new RegisterViewModel();
  
    const handleRegister = async (e) => {
      e.preventDefault();
      const response = await viewModel.register(email, password);
  
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
      <RegisterView
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleRegister}
      />
    );
  };
  
  export default RegisterController;
  