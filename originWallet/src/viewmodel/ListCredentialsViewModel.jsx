import axios from 'axios';
import ViewModel from './ViewModel';

class ListCredentialsViewModel extends ViewModel{
  async fetchCredentials(token) {
    try {
      const response = await axios.get(this.apiUrl+'/credentials', {
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

export default ListCredentialsViewModel;
