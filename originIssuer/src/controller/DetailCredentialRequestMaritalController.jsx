import  { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'

import DetailCredentialRequestMaritalViewModel from '../viewmodel/DetailCredentialRequestMaritalViewModel';
import DetailCredentialRequestMaritalView from '../view/DetailCredentialRequestMaritalView';

const DetailCredentialRequestMaritalController = ({ token }) => {
    const [searchParams] = useSearchParams()
    const [marData, setMARData] = useState({
      state: '',
      personalIdentifier: ''
    });
    const [vcStatus, setvcStatus] = useState({
      id: '',
      pending: '',
      status: 'false'
    });
    const id = searchParams.get('id');
    const viewModel = new DetailCredentialRequestMaritalViewModel();

    useEffect(() => {
        const fetchData = async () => {
            //VC Data
            let response = await viewModel.getVC(id, token);            
            if(!response.success)
                return alert(response.description);
            else
                setMARData(response.data.vcs_request);
            //VC Verification Status
            response = await viewModel.getVCStatus(id, token);
            if(!response.success)
                return alert(response.description);
            else
                setvcStatus(response.data.verification);

        };
        fetchData();
    }, [token]);

    const handleRelease = async () => {
        const response = await viewModel.reeleaseVC(id,token)
        console.log(response);
        if(!response.success)
            return alert(response.description);
        else{
          window.location.href = response.data.redirectWalletUri;
        }
    };


  return (
    <DetailCredentialRequestMaritalView
      marData={marData}
      vcStatus={vcStatus}
      handleRelease={handleRelease}
    />
  );
};

export default DetailCredentialRequestMaritalController;
