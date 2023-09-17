import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import RegisterViewModel from '../viewmodel/RegisterViewModel'; // Assumi che LoginViewModel sia stato importato correttamente
import RegisterView from '../view/RegisterView';


const RegisterController = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const viewModel = new RegisterViewModel();

    //State from previous pages
    const location = useLocation();
    let state = {pending:false,type:null,sessionId:null}
    if (typeof location.state !== 'undefined' && location.state !== null)
      state = useLocation().state;
  
    const handleRegister = async (e) => {
      e.preventDefault();
      const response = await viewModel.register(email, password);
      alert(response.description);
      if (response.success) {
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
      <RegisterView
        email={email}
        password={password}
        state={state}
        setEmail={setEmail}
        setPassword={setPassword}
        handleRegister={handleRegister}
      />
    );
  };
  
  export default RegisterController;
  