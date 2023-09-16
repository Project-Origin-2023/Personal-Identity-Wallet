import  { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useLocation, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'

=======
import { useLocation } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
>>>>>>> originwallet

import DetailCredentialViewModel from '../viewmodel/DetailCredentialViewModel';
import DetailCredentialView from '../view/DetailCredentialView';

const DetailCredentialController = ({token, setToken}) => {
    const location = useLocation()
<<<<<<< HEAD
    //Reindirizzamento
    let navigate = useNavigate();
=======
>>>>>>> originwallet
    if (location.state === undefined || location.state === null)
      return <Navigate to='/ListCredentials' />
        
    const { credential } = location.state

    //Creazione ViewModel
    const viewModel = new DetailCredentialViewModel();
    
    const handleDelete = async () => {
        //Aggioranamento token
        let response = await viewModel.refreshAuth(token)
        if(response.success)
          setToken(response.data.token)

        //Eliminazione Credenziale
        let id = credential.id;
        response = await viewModel.deleteVC(id,token)
        console.log(response)
        if(!response.success)
            return alert(response.description);
        else{
<<<<<<< HEAD
            navigate('/ListCredentials');
=======
            return <Navigate to='/ListCredentials' />
>>>>>>> originwallet
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
