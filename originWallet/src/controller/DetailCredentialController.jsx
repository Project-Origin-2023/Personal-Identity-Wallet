import { Navigate } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

import DetailCredentialViewModel from '../viewmodel/DetailCredentialViewModel';
import DetailCredentialView from '../view/DetailCredentialView';

const DetailCredentialController = ({token, setToken, state}) => {
    //Reindirizzamento
    let navigate = useNavigate();
    
    //Location state pass
    const location = useLocation()
    if (location.state === undefined || location.state === null)
      return <Navigate to='/ListCredentials' />
    const { credential } = location.state

    //Creazione ViewModel
    const viewModel = new DetailCredentialViewModel();

    useEffect(() => {
      const fetchData = async () => {
          //Redirect to Login if not present the Token
          if(typeof token=== "undefined" || token===null || token==="") {
            return navigate('/Login');      
          }
      }
      fetchData();
    }, [token]);

    const handleDelete = async () => {
        //Auth Token Refresh
        let response = await viewModel.refreshAuth(token)
        if(response.success)
          setToken(response.data.token)

        //Eliminazione Credenziale
        let id = credential.id;
        response = await viewModel.deleteVC(id,token)
        if(!response.success)
            return alert(response.description);
        else{
            navigate('/ListCredentials');
        }
    };


  return (
    <DetailCredentialView
      credential={credential}
      handleDelete={handleDelete}
    />
  );
};

export default DetailCredentialController;
