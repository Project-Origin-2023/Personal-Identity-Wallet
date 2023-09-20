import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import CredentialRequestPIDViewModel from '../viewmodel/CredentialRequestPIDViewModel'; // Assumi che VCSRequestViewModel sia stato importato correttamente
import CredentialRequestPIDView from '../view/CredentialRequestPIDView';



function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

const CredentialRequestPIDController = ({ token }) => {
  //Reindirizzamento
  let navigate = useNavigate();
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
      navigate('/ListCredentialRequests');      
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      //Redirect to Login if not present the Token
      if(typeof token=== "undefined" || token===null || token==="") {
        return navigate('/Login');      
      }
    }
    fetchData();
  }, [token]);

  return (
    <CredentialRequestPIDView
      pidData={pidData}
      setPIDData={setPIDData}
      handleSubmit={handleSubmit}
    />
  );
};

export default CredentialRequestPIDController;
