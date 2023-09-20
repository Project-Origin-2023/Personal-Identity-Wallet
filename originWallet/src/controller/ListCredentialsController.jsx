import { useEffect, useState } from 'react';
import ListCredentialsViewModel from '../viewmodel/ListCredentialsViewModel';
import ListCredentialsView from '../view/ListCredentialsView';
import BackdropView from '../view/BackdropView';
import { useNavigate } from 'react-router-dom'


const ListCredentialsController = ({ token , setToken, state }) => {
  //Reindirizzamento
  let navigate = useNavigate();
  const viewModel = new ListCredentialsViewModel();
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //Redirect to Login if not present the Token
      if(typeof token=== "undefined" || token===null || token==="") {
        return navigate('/Login');      
      }
      //Auth Token Refresh
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
