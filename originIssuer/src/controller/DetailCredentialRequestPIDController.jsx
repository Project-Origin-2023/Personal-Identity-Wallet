import  { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'

import DetailCredentialRequestPIDViewModel from '../viewmodel/DetailCredentialRequestPIDViewModel';
import DetailCredentialRequestPIDView from '../view/DetailCredentialRequestPIDView';

const DetailCredentialRequestPIDController = ({ token }) => {
    const [searchParams] = useSearchParams()
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
    const [vcStatus, setvcStatus] = useState({
      id: '',
      pending: '',
      status: 'false'
    });
    const id = searchParams.get('id');
    const viewModel = new DetailCredentialRequestPIDViewModel();

    useEffect(() => {
        const fetchData = async () => {
            //VC Data
            let response = await viewModel.getVC(id, token);            
            if(!response.success)
                return alert(response.description);
            else
                setPIDData(response.data.vcs_request);
            //VC Verification Status
            response = await viewModel.getVCStatus(id, token);
            if(!response.success)
                return alert(response.description);
            else
                setvcStatus(response.data.verification);

        };
        fetchData();
    }, [token]);

    const handleRelease = () => {
        const response = viewModel.reeleaseVC(id,token)
        console.log(response);
        if(!response.success)
            return alert(response.description);
        else{
          //TODO
          //REINDIRIZZA AL LINK DEL
        }
    };


  return (
    <DetailCredentialRequestPIDView
      pidData={pidData}
      vcStatus={vcStatus}
      handleRelease={handleRelease}
    />
  );
};

export default DetailCredentialRequestPIDController;
