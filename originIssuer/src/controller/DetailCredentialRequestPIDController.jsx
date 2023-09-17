import  { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'

import DetailCredentialRequestPIDViewModel from '../viewmodel/DetailCredentialRequestPIDViewModel';
import DetailCredentialRequestPIDView from '../view/DetailCredentialRequestPIDView';

const DetailCredentialRequestPIDController = ({ token }) => {
    let navigate = useNavigate();
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

    const [openWalletList, setOpenWalletList] = useState();
    const [openidIssuanceURIQR , setOpenidIssuanceURIQR ] = useState();
    const [openidIssuanceURI , setOpenidIssuanceURI ] = useState();
    const [walletList, setWalletList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            //Redirect to Login if not present the Token
            if(typeof token=== "undefined" || token===null || token==="") {
              return navigate('/Login');      
            }
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
            //Fetch Wallets List
            response = await viewModel.getWalletList(token);
            if(!response.success)
                return alert(response.description);
            else{
                let walletsInfo = response.data
                let wallets = [];
                Object.keys(walletsInfo).forEach(key => {
                  wallets.push(walletsInfo[key].id)
                });
                setWalletList(wallets);
            }

        };
        fetchData();
    }, [token]);

    const handleRelease = async (wallet) => {
        const response = await viewModel.releaseVC(id,wallet,token)
        if(!response.success)
            return alert(response.description);
        else{
          window.location.href = response.data.redirectWalletUri;
        }
    };

    const handleOpenWalletList = async () => {
      //Generate QR Code
      let result = await viewModel.releaseVCCrossDevice(id,token)
      if(result.success){
        let uri = result.data.redirectWalletUri;
        setOpenidIssuanceURI(uri)
        setOpenidIssuanceURIQR(viewModel.getApiUrl()+'/qr?uri='+encodeURIComponent(uri));
      }
      //Show List
      setOpenWalletList(true)
    };

    const handleCloseWalletList = () => {
      setOpenWalletList(false)
    }

    return (
    <DetailCredentialRequestPIDView
      pidData={pidData}
      vcStatus={vcStatus}
      handleRelease={handleRelease}
      handleOpenWalletList={handleOpenWalletList}
      handleCloseWalletList={handleCloseWalletList}
      openWalletList={openWalletList}
      openidIssuanceURI={openidIssuanceURI}
      openidIssuanceURIQR={openidIssuanceURIQR}
      wallets={walletList}
    />
  );
};

export default DetailCredentialRequestPIDController;
