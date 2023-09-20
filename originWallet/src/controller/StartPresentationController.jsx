import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


import StartPresentationViewModel from '../viewmodel/StartPresentationViewModel';
import StartPresentationView from '../view/StartPresentationView';

const StartPresentationController = ({token, setToken, state}) => {
    //Reindirizzamento
    let navigate = useNavigate();

    //Creazione ViewModel
    const viewModel = new StartPresentationViewModel();
    const [uri,setUri] = useState({uri:''});
    
    useEffect(() => {
      const fetchData = async () => {
          //Redirect to Login if not present the Token
          if(typeof token=== "undefined" || token===null || token==="") {
            return navigate('/Login');      
          }
      }
      fetchData();
    }, [token]);

    const handleUriChange = (event) => {
      const { name, value } = event.target;
      setUri({uri:value});
    }

    const handleStartPresentation = async () => {
      //Auth Token Refresh
      let response = await viewModel.refreshAuth(token)
      if(response.success)
        setToken(response.data.token)

      //Inizio la Procedura di Verifiable Presentation
      response = await viewModel.startPresentation(uri,token)
      if(!response.success)
          return alert(response.description);
      else{
        let sessionId=response.data;
        navigate('/CredentialRequest/?sessionId='+sessionId);      
      }
  };


  return (
    <StartPresentationView
      handleUriChange={handleUriChange}
      handleStartPresentation={handleStartPresentation}
    />
  );
};

export default StartPresentationController;
