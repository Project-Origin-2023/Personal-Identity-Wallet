import axios from 'axios';
import ViewModel from './ViewModel';

class DetailCredentialViewModel extends ViewModel{

  async getVCStatus(id, jwtToken){
    try {
      const response = await axios.get(this.apiUrl+'/vcsrequest/status/'+id , {
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

export default DetailCredentialViewModel;