import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ViewCredentialRequestsViewModel from '../viewmodel/credentialRequest_viewmodel';
import ViewCredentialRequestsView from '../view/credentialRequest_view';

const ViewCredentialRequestsController = ({ token }) => {
  const viewModel = new ViewCredentialRequestsViewModel();
  const [vcs_requestsPID, setvcs_requestsPID] = useState([]);
  const [vcs_requestsMarital, setvcs_requestsMarital] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
    <ViewCredentialRequestsView
      vcs_requestsPID={vcs_requestsPID}
      vcs_requestsMarital={vcs_requestsMarital}
    />
  );
};

ViewCredentialRequestsController.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ViewCredentialRequestsController;
