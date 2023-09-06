import axios from 'axios';

class LoginViewModel {
  constructor() {
    // Configura l'URL del tuo backend per l'autenticazione
    this.apiUrl = 'http://api.issuer.origin/auth';
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, {
        
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

export default LoginViewModel;
