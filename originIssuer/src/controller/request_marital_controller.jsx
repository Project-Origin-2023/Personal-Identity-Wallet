import  { useState } from 'react';
import VCSRequestViewModel from '../viewmodel/request_marital_viewmodel'; // Assumi che VCSRequestViewModel sia stato importato correttamente
import CredentialRequestMaritalView from '../view/request_marital_view';

const CredentialRequestMaritalController = ({ token }) => {
  const [maritalData, setMaritalData] = useState({ //da sistemare
    status: '',
    personalIdentifier: '',
  });

  const viewModel = new VCSRequestViewModel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await viewModel.requestVCS(maritalData,token);
    alert(response.description)
    if (response.success) {
      //TODO
      //rendirizzamento a lista richieste credenziali
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
