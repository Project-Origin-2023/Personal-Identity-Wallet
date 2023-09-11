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
    const id = searchParams.get('id');
    const viewModel = new DetailCredentialRequestPIDViewModel();

    useEffect(() => {
        const fetchData = async () => {
            const response = await viewModel.getVC(id, token);            
            if(!response.success)
                return alert(response.description);
            else
                setPIDData(response.data.vcs_request);
        };
        fetchData();
    }, [token]);

    const handleRelease = (event) => {
        viewModel.reeleaseVC(id)
    };


  return (
    <DetailCredentialRequestPIDView
      pidData={pidData}
      handleRelease={handleRelease}
    />
  );
};

export default DetailCredentialRequestPIDController;
