import axios from 'axios';

class DetailCredentialRequestPIDViewModel {
  constructor() {
    this.apiUrl = 'http://localhost:3000/vcsrequest/pid'; 
  }

  async getVC(id, jwtToken) {
    try {
      const response = await axios.get(this.apiUrl+"/"+id , {
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