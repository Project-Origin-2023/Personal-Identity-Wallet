import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import ListCredentialsViewModel from '../viewmodel/ListCredentialsViewModel';
import ListCredentialsView from '../view/ListCredentialsView';
import BackdropView from '../view/BackdropView';

const ListCredentialsController = ({ token , setToken}) => {
  const viewModel = new ListCredentialsViewModel();
  const [credentials, setCredentials] = useState([]);

  // location for state pass parameter
  const location = useLocation()
  if (location.state === undefined || location.state === null){}else{
    //alert(location.state.message)
    //TODO show a message popup
  }
  

  useEffect(() => {
    const fetchData = async () => {
      //Aggioranamento token
      let response = await viewModel.refreshAuth(token)
      if(response.success)
        setToken(response.data.token)

      //fetch Credentials
      response = await viewModel.fetchCredentials(token);
      if(!response.success)
        return alert(response.description);
      setCredentials(response.data.list);
    };
    fetchData();
  }, [token]);


  return (
    <div>
    { credentials.length > 0 ? (
      <ListCredentialsView
      credentials={credentials}
      />
    ):(
      <BackdropView/>
    )}
    </div>
  );
};


export default ListCredentialsController;
