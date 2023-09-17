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

    const handleRelease = async (wallet) => {
        const response = await viewModel.reeleaseVC(id,wallet,token)
        if(!response.success)
            return alert(response.description);
        else{
          window.location.href = response.data.redirectWalletUri;
        }
    };


  return (
    <DetailCredentialRequestPIDView
      pidData={pidData}
      vcStatus={vcStatus}
      handleRelease={handleRelease}
      wallets={['origin','waltid','waltiddemo']}
    />
  );
};

export default DetailCredentialRequestPIDController;
