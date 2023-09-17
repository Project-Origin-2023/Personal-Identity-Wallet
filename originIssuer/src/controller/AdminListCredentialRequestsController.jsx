import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import AdminListCredentialRequestsViewModel from '../viewmodel/AdminListCredentialRequestsViewModel';
import AdminListCredentialRequestsView from '../view/AdminListCredentialRequestsView';

const AdminListCredentialRequestsController = ({ token }) => {
  const viewModel = new AdminListCredentialRequestsViewModel();
  const [vcs_requestsPending, setvcs_requestsPending] = useState([]);
  const [vcs_requestsNoPending, setvcs_requestsNoPending] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      //Redirect to Login if not present the Token
      if(typeof token=== "undefined" || token===null || token==="") {
        return navigate('/Login');      
      }

      const responsePending = await viewModel.fetchDataPending(token);
      if(!responsePending.success)
        return alert(responsePending.description);
      setvcs_requestsPending(responsePending.data.vcs_requests_pending);

      const responseNoPending = await viewModel.fetchDataNoPending(token);
      if(!responseNoPending.success)
        return alert(responseNoPending.description);
      setvcs_requestsNoPending(responseNoPending.data.vcs_requests_notpending);
      
    };
    fetchData();
  }, [token]);


  return (
    <AdminListCredentialRequestsView
      vcs_requestsPending={vcs_requestsPending}
      vcs_requestsNoPending={vcs_requestsNoPending}
    />
  );
};


export default AdminListCredentialRequestsController;
