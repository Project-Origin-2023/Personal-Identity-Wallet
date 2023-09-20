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
        //RUN that fetch credential and presentable credential algoritm
        //only one time, or the first time, or if there is still no data to show
        if(presentableCredentials.length == 0){
            //Get Credentials
            response = await viewModel.fetchCredentials(token);
            if(!response.success)
              return alert(response.description);
            //Transformo l-array di credentials da numerico a rintraciabile tramite id
            let credsList = response.data.list;
            const map = new Map();
            credsList.forEach((n, i) => (map.set(n.id,n)));
            //Set Lista tutte le credential possedute
            setCredentials(map);
            //Get info issuance with session ID
            response = await viewModel.vpContinue(sessionId,token)
            if(!response.success)
                return alert(response.description);
            let vp = response.data.presentableCredentials;
            //Set VP Presentable Credentials 
            setPresentableCredentials(vp);
            let preVP = {}
            vp.forEach((n, i) => (preVP[n.credentialId]=false));
            //Set list of preferences for selectiong presentable Credentials
            setPreferencesPC(preVP);
        }
      };
      fetchData();
    }, [token]);

    

    const handleFulfill = async () => {
      //Auth Token Refresh
      let response = await viewModel.refreshAuth(token)
      if(response.success)
        setToken(response.data.token)

      //Seleziono dalle presentable credentials, le vp selezionate con le preferences
      let selectedPC = [];
      for(let pref in preferencesPC){
        if(preferencesPC[pref]){
        for(let credId in presentableCredentials){
          if (presentableCredentials[credId].credentialId === pref)
            selectedPC.push(presentableCredentials[credId]);
        }}
      }

      //effettuo la fullfill delle VP selezionate per terminare la Verifiable Presentation
      response = await viewModel.fulfill(sessionId,{claims:selectedPC},token)
      if(!response.success)
        return alert(response.description);
      else{
        if(response.data.rp_response == null || typeof response.data.rp_response !== "string")
          alert("Verifiable Presentation Not Fulfilled, it is a problem of OpenID Protocol")
        else
          window.location.href = response.data.rp_response;
      }
  };


  return (
    <CredentialRequestView
    presentableCredentials={presentableCredentials}
    preferencesPC={preferencesPC}
    setPreferencesPC={setPreferencesPC}
    credentials={credentials}
    handleFulfill={handleFulfill}
    />
  );
};

export default CredentialRequestController;
