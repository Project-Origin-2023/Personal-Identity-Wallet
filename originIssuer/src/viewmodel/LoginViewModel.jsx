import axios from 'axios';
import ViewModel from './ViewModel';

class LoginViewModel extends ViewModel{
  async login(email, password) {
    try {
      const response = await axios.post(`${this.apiUrl}/auth/login`, {
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
