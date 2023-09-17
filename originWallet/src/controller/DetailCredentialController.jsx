import { Navigate } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'


import DetailCredentialViewModel from '../viewmodel/DetailCredentialViewModel';
import DetailCredentialView from '../view/DetailCredentialView';

const DetailCredentialController = ({token, setToken}) => {
    //Reindirizzamento
    let navigate = useNavigate();
    //Location state pass
    const location = useLocation()
    if (location.state === undefined || location.state === null)
      return <Navigate to='/ListCredentials' />
        
    const { credential } = location.state

    //Creazione ViewModel
    const viewModel = new DetailCredentialViewModel();
    
    const handleDelete = async () => {
        //Aggioranamento token
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
