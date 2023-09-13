import axios from 'axios';
import ViewModel from './ViewModel';

class CredentialRequestMaritalViewModel extends ViewModel{
  async requestVCS(maritalData, jwtToken) { 
    try {
      const response = await axios.post(this.apiUrl+'/vcsrequest/marital', maritalData, {
        headers: {
          "x-access-token": `${jwtToken}`
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default CredentialRequestMaritalViewModel;