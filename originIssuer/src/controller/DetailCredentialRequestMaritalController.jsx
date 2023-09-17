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
        const response = await viewModel.releaseVC(id,token)
        if(!response.success)
            return alert(response.description);
        else{
          window.location.href = response.data.redirectWalletUri;
        }
    };

    const [openWalletList, setOpenWalletList] = useState();
    const [openidIssuanceURIQR , setOpenidIssuanceURIQR ] = useState();
    
    const handleOpenWalletList = async () => {
      //Generate QR Code
      let result = await viewModel.releaseVCCrossDevice(id,token)
      let encodedOpenidIssuanceURI = '';
      if(result.success)
        encodedOpenidIssuanceURI = encodeURIComponent(result.data.redirectWalletUri);
      setOpenidIssuanceURIQR(viewModel.getApiUrl()+'/qr?uri='+encodedOpenidIssuanceURI);
      //Show List
      setOpenWalletList(true)
    };

    const handleCloseWalletList = () => {
      setOpenWalletList(false)
    }


  return (
    <DetailCredentialRequestMaritalView
      marData={marData}
      vcStatus={vcStatus}
      handleRelease={handleRelease}
      handleOpenWalletList={handleOpenWalletList}
      handleCloseWalletList={handleCloseWalletList}
      openWalletList={openWalletList}
      openidIssuanceURIQR={openidIssuanceURIQR}
      wallets={['origin','waltid','waltiddemo']}
    />
  );
};

export default DetailCredentialRequestMaritalController;
