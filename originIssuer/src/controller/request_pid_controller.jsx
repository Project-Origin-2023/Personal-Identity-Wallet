import React, { useState } from 'react';
import VCSRequestViewModel from '../viewmodel/request_pid_viewmodel'; // Assumi che VCSRequestViewModel sia stato importato correttamente
import CredentialRequestPIDView from '../view/credential_request_pid';

const CredentialRequestPIDController = () => {
  const [pidData, setPIDData] = useState({
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
    const response = await viewModel.requestVCS(pidData, jwtToken);

    if (response.success) {
      alert(response.message);

    } else {
      alert(response.message);
    }
  };

  return (
    <CredentialRequestPIDView
      pidData={pidData}
      setPIDData={setPIDData}
      jwtToken={jwtToken}
      handleSubmit={handleSubmit}
    />
  );
};

export default CredentialRequestPIDController;
