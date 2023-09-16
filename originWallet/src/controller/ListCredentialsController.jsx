import { useEffect, useState } from 'react';
import ListCredentialsViewModel from '../viewmodel/ListCredentialsViewModel';
import ListCredentialsView from '../view/ListCredentialsView';

const ListCredentialsController = ({ token , setToken}) => {
  const viewModel = new ListCredentialsViewModel();
  const [credentials, setCredentials] = useState([]);

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
    <ListCredentialsView
      credentials={credentials}
    />
  );
};


export default ListCredentialsController;
