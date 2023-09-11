import axios from 'axios';

class CredentialPendingViewModel {
  async fetchData(token) {
    try {
      const response = await axios.get('/admin/vcsrequests/pending', {
        headers: {
          'x-access-token': token,
        },
      });

      if (response.data.success) {
        return response.data.result;
      }
      return [];
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default CredentialPendingViewModel;
