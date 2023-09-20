import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import ListCredentialRequestsViewModel from '../viewmodel/ListCredentialRequestsViewModel';
import ListCredentialRequestsView from '../view/ListCredentialRequestsView';

const ListCredentialRequestsController = ({ token }) => {
  let navigate = useNavigate();
  const viewModel = new ListCredentialRequestsViewModel();
  const [vcs_requestsPID, setvcs_requestsPID] = useState([]);
  const [vcs_requestsMarital, setvcs_requestsMarital] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //Redirect to Login if not present the Token
      if(typeof token=== "undefined" || token===null || token==="") {
        return navigate('/Login');      
      }
      const responsePID = await viewModel.fetchDataPID(token);
      if(!responsePID.success)
        return alert(responsePID.description);
      setvcs_requestsPID(responsePID.data.vcs_requests);
      const responseMarital = await viewModel.fetchDataMarital(token);
      if(!responseMarital.success)
        return alert(responsePID.description);
      setvcs_requestsMarital(responseMarital.data.vcs_requests);
    };
    fetchData();
  }, [token]);


  return (
    <ListCredentialRequestsView
      vcs_requestsPID={vcs_requestsPID}
      vcs_requestsMarital={vcs_requestsMarital}
    />
  );
};


export default ListCredentialRequestsController;
