import axios from 'axios';

class AdminListCredentialRequestsViewModel {
  async fetchDataPending(token) {
    try {
      const response = await axios.get('http://localhost:3000/admin/vcsrequests/pending', {
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
      const response = await axios.get('http://localhost:3000/admin/vcsrequests/notpending', {
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
