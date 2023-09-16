import  { useState } from 'react';
import { Navigate } from 'react-router-dom'

import CredentialRequestMaritalViewModel from '../viewmodel/CredentialRequestMaritalViewModel'; // Assumi che VCSRequestViewModel sia stato importato correttamente
import CredentialRequestMaritalView from '../view/CredentialRequestMaritalView';

const CredentialRequestMaritalController = ({ token }) => {
  const [maritalData, setMaritalData] = useState({ //da sistemare
    status: '',
    personalIdentifier: '',
  });

  const viewModel = new CredentialRequestMaritalViewModel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await viewModel.requestVCS(maritalData,token);
    alert(response.description)
    if (response.success) {
      return <Navigate to='/ListCredentialRequests' />
    }
  };

  return (
    <CredentialRequestMaritalView
      maritalData={maritalData}
      setMaritalData={setMaritalData}
      handleSubmit={handleSubmit}
    />
  );
};

export default CredentialRequestMaritalController;
