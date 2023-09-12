import axios from 'axios';

class AdminVerifyCredentialRequestViewModel {
  async getVCPid(id, jwtToken) {
    try {
      const response = await axios.get('http://localhost:3000/vcsrequest/pid/'+id , {
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
      const response = await axios.get('http://localhost:3000/vcsrequest/marital/'+id , {
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
      const response = await axios.post('http://localhost:3000/admin/vcsrequest/verify' ,
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