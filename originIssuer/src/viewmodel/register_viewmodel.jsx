import axios from 'axios';

class RegisterViewModel {
  constructor() {
    // Configura l'URL del tuo backend per l'autenticazione
    this.apiUrl = 'http://api.issuer.origin/auth';
  }

  async register(email, password) {
    try {
      const response = await axios.post(`${this.apiUrl}/register`, {
        
        email: email,
        password: password,
      });
      
      // Restituisci la risposta grezza dall'API senza alcuna elaborazione
      console.log("prova", response.data);
      return response.data;
  
      
    } catch (error) {
      console.error(error); //prova 
      console.log("errore", email, password) //prova
      return error;
    }
  }
}

export default RegisterViewModel;
