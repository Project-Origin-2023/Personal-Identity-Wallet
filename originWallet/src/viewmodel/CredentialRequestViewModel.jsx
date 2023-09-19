import axios from 'axios';
import ViewModel from './ViewModel';

class CredentialRequestViewModel extends ViewModel{

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

  async vpContinue(sessionId,jwtToken){
    try {
      const response = await axios.get(this.apiUrl+'/vp/continue?sessionId='+sessionId , {
        headers: {
          "x-access-token": `${jwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async fulfill(sessionId,claims,jwtToken){
    try {
      const response = await axios.post(this.apiUrl+'/vp/fulfill?sessionId='+sessionId ,claims, {
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

export default CredentialRequestViewModel;