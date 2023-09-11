import axios from 'axios';

class CredentialRequestMaritalViewModel {
  constructor() {
    
    this.apiUrl = 'http://localhost:3000/vcsrequest/marital'; 
  }

  async requestVCS(maritalData, jwtToken) { 
    try {
      const response = await axios.post(this.apiUrl, maritalData, {
        headers: {
          "x-access-token": `${jwtToken}`
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default CredentialRequestMaritalViewModel;