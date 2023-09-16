import  { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
<<<<<<< HEAD
import { useLocation, useNavigate } from 'react-router-dom'
=======
>>>>>>> originwallet
import { Navigate } from 'react-router-dom'

import AdminVerifyCredentialRequestViewModel from '../viewmodel/AdminVerifyCredentialRequestViewModel';
import AdminVerifyCredentialRequestPidView from '../view/AdminVerifyCredentialRequestPidView';
import AdminVerifyCredentialRequestMaritalView from '../view/AdminVerifyCredentialRequestMaritalView';

const AdminVerifyCredentialRequestController = ({ token }) => {
    //Reindirizzamento
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [type, setType] = useState("pid");
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
    const [maritalData, setMaritalData] = useState({
      state: '',
      personalIdentifier: ''
    });

    const id = searchParams.get('id');
    const viewModel = new AdminVerifyCredentialRequestViewModel();

    useEffect(() => {
        const fetchData = async () => {
            //VC Data PID
            let response = await viewModel.getVCPid(id, token);            
            if(response.success){
              setType("pid");
              return setPIDData(response.data.vcs_request);
            }
            //VC Data Marital
            response = await viewModel.getVCMarital(id, token);
            if(response.success){
              setType("marital");
              return setMaritalData(response.data.vcs_request);
            }
            //if not found alert
            alert(response.description);
        };
        fetchData();
    }, [token]);

    const handleVerify = async () => {
        const response = await viewModel.verifyVC(id,true,token)
        if(!response.success)
            return alert(response.description);
        else{
<<<<<<< HEAD
            navigate('/AdminListCredentialRequests');
=======
            return <Navigate to='/AdminListCredentialRequests' />
>>>>>>> originwallet
        }
    };
  
  if(type=="pid"){
    return (<AdminVerifyCredentialRequestPidView
    pidData={pidData}
    handleVerify={handleVerify}
    />)}
  else{
    return (<AdminVerifyCredentialRequestMaritalView
    maritalData={maritalData}
    handleVerify={handleVerify}
    />)}
};

export default AdminVerifyCredentialRequestController;
