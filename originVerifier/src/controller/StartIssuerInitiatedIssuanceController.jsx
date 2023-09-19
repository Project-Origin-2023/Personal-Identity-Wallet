import  { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


import StartIssuerInitiatedIssuanceViewModel from '../viewmodel/StartIssuerInitiatedIssuanceViewModel';
import StartIssuerInitiatedIssuanceView from '../view/StartIssuerInitiatedIssuanceView';

const StartIssuerInitiatedIssuanceController = ({token, setToken, state}) => {
    //Reindirizzamento
    let navigate = useNavigate();

    //Creazione ViewModel
    const viewModel = new StartIssuerInitiatedIssuanceViewModel();
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

    const handleStartIssuance = async () => {
      //Auth Token Refresh
      let response = await viewModel.refreshAuth(token)
      if(response.success)
        setToken(response.data.token)

      //Inizio la Procedura di Credential issuing
      response = await viewModel.startIssuance(uri,token)
      console.log(response)
      if(!response.success)
          return alert(response.description);
      else{
        let sessionId=response.data;
        navigate('/InitiateIssuance/?sessionId='+sessionId);      
      }
  };


  return (
    <StartIssuerInitiatedIssuanceView
      handleUriChange={handleUriChange}
      handleStartIssuance={handleStartIssuance}
    />
  );
};

export default StartIssuerInitiatedIssuanceController;
