import axios from 'axios';
import ViewModel from './ViewModel';

class AdminVerifyCredentialRequestViewModel extends ViewModel{
  async getVCPid(id, jwtToken) {
    try {
      const response = await axios.get(this.apiUrl+'/vcsrequest/pid/'+id , {
        headers: {
          "x-access-token": `${jwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async getVCMarital(id, jwtToken) {
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

  async verifyVC(id, status, jwtToken){
    try {
      const response = await axios.post(this.apiUrl+'/admin/vcsrequest/verify' ,
      {vcsrequestId:id, status:status},{
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

export default AdminVerifyCredentialRequestViewModel;