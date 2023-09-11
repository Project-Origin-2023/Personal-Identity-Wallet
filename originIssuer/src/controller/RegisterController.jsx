import { useState } from 'react';
import RegisterViewModel from '../viewmodel/RegisterViewModel'; // Assumi che LoginViewModel sia stato importato correttamente
import RegisterView from '../view/RegisterView';


const RegisterController = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const viewModel = new RegisterViewModel();
  
    const handleRegister = async (e) => {
      e.preventDefault();
      const response = await viewModel.register(email, password);
      alert(response.description);
      if (response.success) {
        setToken(response.data.token);
        window.location.reload(true);
        window.location.href = '/home'; //prova di reindirezzamento
      }
    };
  
    return (
      <RegisterView
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleRegister={handleRegister}
      />
    );
  };
  
  export default RegisterController;
  