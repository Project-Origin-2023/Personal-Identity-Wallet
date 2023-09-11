import  { useState } from 'react';
import VCSRequestViewModel from '../viewmodel/request_pid_viewmodel'; // Assumi che VCSRequestViewModel sia stato importato correttamente
import CredentialRequestPIDView from '../view/request_pid_view';

const CredentialRequestPIDController = ({ token }) => {
  const [pidData, setPIDData] = useState({
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

  const viewModel = new VCSRequestViewModel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await viewModel.requestVCS(pidData, token);
    alert(response.description)
    if (response.success) {
      //TODO
      //rendirizzamento a lista richieste credenziali
    }
  };

  return (
    <CredentialRequestPIDView
      pidData={pidData}
      setPIDData={setPIDData}
      handleSubmit={handleSubmit}
    />
  );
};

export default CredentialRequestPIDController;
