import  { useState } from 'react';
import VCSRequestViewModel from '../viewmodel/request_marital_viewmodel'; // Assumi che VCSRequestViewModel sia stato importato correttamente
import CredentialRequestMaritalView from '../view/request_marital_view';

const CredentialRequestMaritalController = () => {
  const [maritalData, setMaritalData] = useState({ //da sistemare
    vcs_request: 0,
    currentAddress: '',
    dateOfBirth: '',
    familyName: '',
    firstName: '',
    gender: '',
    identifier: '',
    nameAndFamilyNameAtBirth: '',
    personalIdentifier: '',
    placeOfBirth: '',
  });

  const [jwtToken, setToken] = useState('');

  const viewModel = new VCSRequestViewModel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await viewModel.requestVCS(maritalData, jwtToken);

    if (response.success) {
      alert(response.message);

    } else {
      alert(response.message);
    }
  };

  return (
    <CredentialRequestMaritalView
      maritalData={maritalData}
      setMaritalData={setMaritalData}
      jwtToken={jwtToken}
      handleSubmit={handleSubmit}
    />
  );
};

export default CredentialRequestMaritalController;
