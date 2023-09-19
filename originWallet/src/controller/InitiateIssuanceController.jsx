import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import InitiateIssuanceViewModel from '../viewmodel/InitiateIssuanceViewModel';
import InitiateIssuanceView from '../view/InitiateIssuanceView';

const InitiateIssuanceController = ({token, setToken, state}) => {
    //Navigate per Reindirizzamento
    let navigate = useNavigate();
    //Query Paramete sessionId
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('sessionId');
    //Model credentialOffer
    const [credentialOffer, setCredentialOffer] = useState({});

    //Creazione ViewModel
    const viewModel = new InitiateIssuanceViewModel();
    
    
    useEffect(() => {
      const fetchData = async () => {
        //If Not logged In Save PageState and rediect to Login
        if(typeof token=== "undefined" || token===null || token==="") {
          state.setState({pending:true,type:'ci',data:{sessionId:sessionId}})
          return navigate('/Login');      
        }
        //Restore PageState default
        if(state.getPending()){
          state.restoreDefaultState();
        }

        //Auth Token Refresh
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
      //Auth Token Refresh
      let response = await viewModel.refreshAuth(token)
      if(response.success)
        setToken(response.data.token)

      //Accetto credential Issuing
      response = await viewModel.acceptIssuance(sessionId,token)
      if(!response.success)
        return alert(response.description);
      else{
        navigate('/ListCredentials',{state:{description:response.description}});      
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
