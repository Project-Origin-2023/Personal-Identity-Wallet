import axios from 'axios';

class DetailCredentialRequestPIDViewModel {
  async getVC(id, jwtToken) {
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

  async getVCStatus(id, jwtToken){
    try {
      const response = await axios.get('http://localhost:3000/vcsrequest/status/'+id , {
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

export default DetailCredentialRequestPIDViewModel;