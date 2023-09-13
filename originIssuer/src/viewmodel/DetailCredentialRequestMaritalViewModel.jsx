import axios from 'axios';
import ViewModel from './ViewModel';

class DetailCredentialRequestMaritalViewModel extends ViewModel{
  async getVC(id, jwtToken) {
    try {
      const response = await axios.get(this.apiUrl+'/vcsrequest/marital/'+id , {
        headers: {
          "x-access-token": `${jwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

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

  async reeleaseVC(id, jwtToken){
    try {
      const response = await axios.get(this.apiUrl+'/vcsrequest/release/'+id , {
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

export default DetailCredentialRequestMaritalViewModel;