import axios from 'axios';

class CredentialReleaseViewModel {
  constructor() {
    this.baseApiUrl = 'http://api.issuer.origin';
  }

  async requestMaritalVCS(jwtToken) {
    const apiUrl = `${this.baseApiUrl}/vcsrequests/marital`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'x-access-token': jwtToken,
        },
      });

      // Restituisci la risposta grezza dall'API senza alcuna elaborazione
      console.log('Risposta API VCS Marital:', response.data);
      return response.data;
    } catch (error) {
      console.error('Errore durante la richiesta VCS Marital:', error);
      throw error;
    }
  }

  async requestPIDVCS(jwtToken) {
    const apiUrl = `${this.baseApiUrl}/vcsrequests/pid`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'x-access-token': jwtToken,
        },
      });

      // Restituisci la risposta grezza dall'API senza alcuna elaborazione
      console.log('Risposta API VCS PID:', response.data);
      return response.data;
    } catch (error) {
      console.error('Errore durante la richiesta VCS PID:', error);
      throw error;
    }
  }

  async checkVCSRequestStatus(requestId, jwtToken) {
    const apiUrl = `${this.baseApiUrl}/vcsrequest/status/${requestId || ''}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'x-access-token': jwtToken,
        },
      });

      // Restituisci la risposta grezza dall'API senza alcuna elaborazione
      console.log('Risposta API Status VCS:', response.data);
      return response.data;
    } catch (error) {
      console.error('Errore durante la verifica dello stato VCS:', error);
      throw error;
    }
  }

  async releaseVCS(requestId, jwtToken) {
    const apiUrl = `${this.baseApiUrl}/vcsrequest/release/${requestId || ''}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'x-access-token': jwtToken,
        },
      });

      // Restituisci la risposta grezza dall'API senza alcuna elaborazione
      console.log('Risposta API Release VCS:', response.data);
      return response.data;
    } catch (error) {
      console.error('Errore durante il rilascio VCS:', error);
      throw error;
    }
  }
}

export default CredentialReleaseViewModel;
