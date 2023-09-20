import PresentationSuccessViewModel from '../viewmodel/PresentationSuccessViewModel'; 
import PresentationSuccessView from '../view/PresentationSuccessView';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'

const PresentationSuccessController = ({token, setToken}) => {
  //Reindirizzamento
  let navigate = useNavigate();
  //ViewModel
  const viewModel = new PresentationSuccessViewModel();
  //Query Paramete sessionId
  const [searchParams] = useSearchParams();
  const access_token= searchParams.get('access_token');
  //variabile che servead eseguire il detchData solo una volta, alla seconda darebbe errore la compoenente OpenID
  const [dataFetch,setDataFetch] = useState(false);
  let dFetch = false;
  const [presentationInfo, setPresentationInfo] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
      //set fetch data fatto
        setDataFetch(true);dFetch=true;
        //Se sono gia' Connessio rendirizzo verso Home
        //Redirect to Home if already COnnected
        if(typeof token=== "undefined" || token===null || token==="") {}else
          return navigate('/Login'); 
        //faccio il fetch dei dati della presentazione
        let result = await viewModel.getPresentationSuccess(access_token);
        if (!result.success){
          alert(result.description)
          return navigate('/Connect')
        }
        setPresentationInfo(result.data)
    }
    if (!dFetch)
      fetchData();
  }, []);

  const handleContinueConnect = async (token) => {
      setToken(token)
      window.location.href = '/';
  };

  if(typeof presentationInfo !== "undefined"){
  return (
    <PresentationSuccessView
    presentationInfo={presentationInfo}
    handleContinueConnect={handleContinueConnect}
    />
  )}else{
    return(<div/>)
  }


};

export default PresentationSuccessController;
