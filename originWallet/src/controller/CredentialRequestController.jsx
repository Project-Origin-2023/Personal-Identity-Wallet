import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import CredentialRequestViewModel from '../viewmodel/CredentialRequestViewModel';
import CredentialRequestView from '../view/CredentialRequestView';

const CredentialRequestController = ({token, setToken, state}) => {
    //Navigate per Reindirizzamento
    let navigate = useNavigate();
    //Query Paramete sessionId
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('sessionId');
    //Model credentials
    const [credentials, setCredentials] = useState();
    //Model presentableCredentials
    const [presentableCredentials, setPresentableCredentials] = useState([])
    //MOdel preferences Presentable Credential selectable with checkbox
    const [preferencesPC, setPreferencesPC] = useState({});
    //Creazione ViewModel
    const viewModel = new CredentialRequestViewModel();
    
    
    useEffect(() => {
      const fetchData = async () => {
        //If Not logged In Save PageState and rediect to Login
        if(typeof token=== "undefined" || token===null || token==="") {
          state.setState({pending:true,type:'vp',data:{sessionId:sessionId}})
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
  
        //Get Credentials
        response = await viewModel.fetchCredentials(token);
        if(!response.success)
          return alert(response.description);
        //Transformo l-array di credentials da numerico a rintraciabile tramite id
        let credsList = response.data.list;
        const map = new Map();
        credsList.forEach((n, i) => (map.set(n.id,n)));
        setCredentials(map);

        //Get info issuance with session ID
        response = await viewModel.vpContinue(sessionId,token)
        if(!response.success)
            return alert(response.description);
        let vp = response.data.presentableCredentials;
        setPresentableCredentials(vp);
        let preVP = {}
        vp.forEach((n, i) => (preVP[n.credentialId]=false));
        setPreferencesPC(preVP);
        
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
    <CredentialRequestView
    presentableCredentials={presentableCredentials}
    preferencesPC={preferencesPC}
    setPreferencesPC={setPreferencesPC}
    credentials={credentials}
    />
  );
};

export default CredentialRequestController;
