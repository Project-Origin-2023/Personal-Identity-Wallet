import  { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import DetailCredentialViewModel from '../viewmodel/DetailCredentialViewModel';
import DetailCredentialView from '../view/DetailCredentialView';

const DetailCredentialController = ({token, setToken}) => {
    const location = useLocation()
    const { credential } = location.state
    
    //Creazione ViewModel
    const viewModel = new DetailCredentialViewModel();
    
    const handleDelete = async () => {
        //Aggioranamento token
        let response = await viewModel.refreshAuth(token)
        if(response.success)
          setToken(response.data.token)

        //Eliminazione Credenziale
        response = await viewModel.reeleaseVC(id,token)
        if(!response.success)
            return alert(response.description);
        else{
          //TODO Redirect to LIST Credential
        }
    };


  return (
    <DetailCredentialView
      credential={credential}
      handleDelete={handleDelete}
    />
  );
};

export default DetailCredentialController;