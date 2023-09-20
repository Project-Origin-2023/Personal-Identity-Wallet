import ServiceIseeView from '../view/ServiceIseeView';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

import ServiceIseeViewModel from '../viewmodel/ServiceIseeViewModel';

const ServiceIseeController = ({token}) => {
  let viewModel = new ServiceIseeViewModel();
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        //Verify Auth per accedere al Service
        let result = await viewModel.verifyauth(token);
        alert(result.description)
        if(!result.success)
          navigate('/'); 

    }
    fetchData();
  }, []);

 
  return (
    <ServiceIseeView/>
  )


};

export default ServiceIseeController;
