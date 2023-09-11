import axios from 'axios';

class LoginViewModel {
  constructor() {
    // Configura l'URL del tuo backend per l'autenticazione
    this.apiUrl = 'http://localhost:3000/auth';
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${this.apiUrl}/login`, {
        email: email,
        password: password,
      });
      return response.data;
  
    } catch (error) {
      return error.response.data;
    }
  }
}

export default LoginViewModel;
