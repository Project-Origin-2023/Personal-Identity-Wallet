import axios from 'axios';

class DetailCredentialRequestMaritalViewModel {
  async getVC(id, jwtToken) {
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

  async reeleaseVC(id, jwtToken){
    try {
      const response = await axios.get('http://localhost:3000/vcsrequest/release/'+id , {
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