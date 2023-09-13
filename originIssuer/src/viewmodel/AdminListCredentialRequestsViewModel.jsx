import axios from 'axios';
import ViewModel from './ViewModel';

class AdminListCredentialRequestsViewModel extends ViewModel{
  async fetchDataPending(token) {
    try {
      const response = await axios.get(this.apiUrl+'/admin/vcsrequests/pending', {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async fetchDataNoPending(token) {
    try {
      const response = await axios.get(this.apiUrl+'/admin/vcsrequests/notpending', {
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

export default AdminListCredentialRequestsViewModel;
