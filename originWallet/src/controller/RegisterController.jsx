import { useState } from 'react';
import RegisterViewModel from '../viewmodel/RegisterViewModel'; // Assumi che LoginViewModel sia stato importato correttamente
import RegisterView from '../view/RegisterView';


const RegisterController = ({ setToken, state }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const viewModel = new RegisterViewModel();
  
    const handleRegister = async (e) => {
      e.preventDefault();
      const response = await viewModel.register(email, password);
      alert(response.description);
      if (response.success) {
        setToken(response.data.token);
        //Redirect in the previous page with previous state or at Home Page
        if (state.getPending()){
            switch (state.getType()) {
              case 'ci':
                window.location.href = '/InitiateIssuance/?sessionId='+state.getData().sessionId;
                break;
              case 'vp':
                window.location.href = '/CredentialRequest/?sessionId='+state.getData().sessionId;
                break;
              default:
                window.location.href = '/';
                break;
            }
        }else{
          window.location.href = '/';
        }
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
  