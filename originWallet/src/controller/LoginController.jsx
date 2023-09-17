import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import LoginViewModel from '../viewmodel/LoginViewModel'; 
import LoginView from '../view/LoginView';

const LoginController = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const viewModel = new LoginViewModel();

  //State from previous pages
  const location = useLocation();
  let state = {pending:false,type:null,sessionId:null}
  if (typeof location.state !== 'undefined' && location.state !== null)
    state = useLocation().state;

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await viewModel.login(email, password);
    alert(response.description);
    if (response.success) {
      //set token
      setToken(response.data.token);
      //Redirect in the previous page with previous state or at Home Page
      if (state.pending){
          switch (state.type) {
            case 'ci':
              window.location.href = '/InitiateIssuance?sessionId='+state.sessionId;
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
    <LoginView
      email={email}
      password={password}
      state={state}
      setEmail={setEmail}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
};

export default LoginController;
