import axios from 'axios';
import ViewModel from './ViewModel';

class InitiateIssuanceViewModel extends ViewModel{

  async acceptIssuance(sessionId,jwtToken){
    try {
      const response = await axios.get(this.apiUrl+'/ci/continue?sessionId='+sessionId , {
        headers: {
          "x-access-token": `${jwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async infoIssuance(sessionId,jwtToken){
    try {
      const response = await axios.get(this.apiUrl+'/ci/info/issuance?sessionId='+sessionId , {
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

export default InitiateIssuanceViewModel;