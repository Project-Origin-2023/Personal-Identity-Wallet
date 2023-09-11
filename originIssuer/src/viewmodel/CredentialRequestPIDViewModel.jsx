import axios from 'axios';

class CredentialRequestPIDViewModel {
  constructor() {
    
    this.apiUrl = 'http://localhost:3000/vcsrequest/PID'; 
  }

  async requestVCS(pidData, jwtToken) {
    try {
      const response = await axios.post(this.apiUrl, pidData, {
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

export default CredentialRequestPIDViewModel;