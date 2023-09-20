import { useLocation } from 'react-router-dom'
import ConnectViewModel from '../viewmodel/ConnectViewModel'; 
import ConnectView from '../view/ConnectView';
import { useEffect, useState } from 'react';

const ConnectController = () => {
  const viewModel = new ConnectViewModel();
  const [wallets,setWallets] = useState()
  const [walletList,setWalletList] = useState()

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
    />
  )}else{return(<hr/>)}


};

export default ConnectController;
