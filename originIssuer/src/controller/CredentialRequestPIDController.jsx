import  { useState } from 'react';
import CredentialRequestPIDViewModel from '../viewmodel/CredentialRequestPIDViewModel'; // Assumi che VCSRequestViewModel sia stato importato correttamente
import CredentialRequestPIDView from '../view/CredentialRequestPIDView';

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

const CredentialRequestPIDController = ({ token }) => {
  let [pidData, setPIDData] = useState({
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

  const viewModel = new CredentialRequestPIDViewModel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    pidData.dateOfBirth = formatDate(new Date(pidData.dateOfBirth));
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
