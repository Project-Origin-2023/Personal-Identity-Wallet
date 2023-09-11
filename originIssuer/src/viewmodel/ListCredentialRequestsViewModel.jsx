import axios from 'axios';

class ListCredentialRequestsViewModel {
  async fetchDataPID(token) {
    try {
      const response = await axios.get('http://localhost:3000/vcsrequests/pid', {
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
      const response = await axios.get('http://localhost:3000/vcsrequests/marital', {
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
