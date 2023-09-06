import axios from 'axios';

class ViewCredentialRequestsViewModel {
  async fetchData(token) {
    try {
      const response = await axios.get('http://', {
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

export default ViewCredentialRequestsViewModel;
