import axios from 'axios';
import ViewModel from './ViewModel';

class ListCredentialRequestsViewModel extends ViewModel{
  async fetchDataPID(token) {
    try {
      const response = await axios.get(this.apiUrl+'/vcsrequests/pid', {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async fetchDataMarital(token) {
    try {
      const response = await axios.get(this.apiUrl+'/vcsrequests/marital', {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default ListCredentialRequestsViewModel;
