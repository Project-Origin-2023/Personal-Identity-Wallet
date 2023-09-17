import  { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


import InitiateIssuanceViewModel from '../viewmodel/InitiateIssuanceViewModel';
import InitiateIssuanceView from '../view/InitiateIssuanceView';

const InitiateIssuanceController = ({token, setToken}) => {
    //Reindirizzamento
    let navigate = useNavigate();
    //parametro query sessionId
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('sessionId');
    //Moello di dati credential Offer
    const [credentialOffer, setCredentialOffer] = useState({});


    //Creazione ViewModel
    const viewModel = new InitiateIssuanceViewModel();
    
    useEffect(() => {
      const fetchData = async () => {
        //Aggioranamento token
        let response = await viewModel.refreshAuth(token)
        if(response.success)
          setToken(response.data.token)
  
        //Get info issuance with session ID
        response = await viewModel.infoIssuance(sessionId,token)
        if(!response.success)
            return alert(response.description);
        else{
            setCredentialOffer(response.data);
        }
      };
      fetchData();
    }, [token]);

    const handleAcceptIssuance = async () => {
      //Aggioranamento token
      let response = await viewModel.refreshAuth(token)
      if(response.success)
        setToken(response.data.token)

      //Accetto la credenziale CI
      response = await viewModel.acceptIssuance(sessionId,token)
      if(!response.success)
          return alert(response.description);
      else{
        navigate('/ListCredentials',{state:{message:response.description}});      
      }
  };


  return (
    <InitiateIssuanceView
      credentialOffer={credentialOffer}
      handleAcceptIssuance={handleAcceptIssuance}
    />
  );
};

export default InitiateIssuanceController;
