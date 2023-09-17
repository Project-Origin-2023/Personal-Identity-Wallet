import axios from 'axios';
import ViewModel from './ViewModel';

class StartIssuerInitiatedIssuanceViewModel extends ViewModel{

  async startIssuance(uri,jwtToken){
    try {
      const response = await axios.post(this.apiUrl+'/ci/continuexdevice',uri, {
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

export default StartIssuerInitiatedIssuanceViewModel;