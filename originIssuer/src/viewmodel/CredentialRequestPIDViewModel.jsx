import axios from 'axios';
import ViewModel from './ViewModel';

class CredentialRequestPIDViewModel extends ViewModel{
  async requestVCS(pidData, jwtToken) {
    try {
      const response = await axios.post(this.apiUrl+'/vcsrequest/PID', pidData, {
        headers: {
          "x-access-token": `${jwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default CredentialRequestPIDViewModel;