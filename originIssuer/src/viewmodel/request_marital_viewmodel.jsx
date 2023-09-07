import axios from 'axios';

class VCSRequestViewModel {
  constructor() {
    
    this.apiUrl = 'http://api.issuer.origin/vcsrequest/marital'; 
  }

  async requestVCS(maritalData, jwtToken) { 
    try {
      const response = await axios.post(this.apiUrl, maritalData, {
        headers: {
          'x-access-token': `${jwtToken}`, //non so se x-access-token vada scrutti tra apici
        },
      });

      // Restituisci la risposta grezza dall'API senza alcuna elaborazione
      console.log('Risposta API VCS:', response.data);
      return response.data;
    } catch (error) {
      console.error('Errore durante la richiesta VCS:', error);
      return error;
    }
  }
}

export default VCSRequestViewModel;