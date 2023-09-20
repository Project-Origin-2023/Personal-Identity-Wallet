import { useEffect, useState } from 'react';

import ConnectViewModel from '../viewmodel/ConnectViewModel'; 
import ConnectView from '../view/ConnectView';

const ConnectController = () => {
  const viewModel = new ConnectViewModel();
  const [wallets,setWallets] = useState()
  const [walletList,setWalletList] = useState()
  const [openidPresentationURIQR , setOpenidPresentationURIQR] = useState();
  const [openidPresentationURI , setOpenidPresentationURI] = useState();

  useEffect(() => {
    const fetchData = async () => {
        //Get Wallets
        let walletsN = await viewModel.getWallets();
        setWallets(walletsN)
        let walletListN = [];
        Object.keys(walletsN).forEach(key => {
          walletListN.push(walletsN[key].id)
        });
        setWalletList(walletListN)
        //Get URI Presentation
        let result = await viewModel.presentxdevice("PID");
        setOpenidPresentationURI(result.url)
        //setOpenidPresentationURIQR('http://api.issuer.origin/qr?uri='+encodeURIComponent(result.url));
        setOpenidPresentationURIQR('https://api.qrserver.com/v1/create-qr-code/?size=300x300&data='+encodeURIComponent(result.url));
        //Decodificato in maniera sbagliata, da fare come nel Issuer per production level
    }
    fetchData();
  }, []);

  const handleConnect = async (wallet) => {
    //Auth Token Refresh
    window.location.href = viewModel.apiUrl+`/present/?walletId=${wallet}&vcType=PID`;
};


  if (typeof wallets !== "undefined"){
  return (
    <ConnectView
    walletList={walletList}
    wallets={wallets}
    handleConnect={handleConnect}
    openidPresentationURIQR={openidPresentationURIQR}
    openidPresentationURI={openidPresentationURI}
    />
  )}else{return(<hr/>)}


};

export default ConnectController;
