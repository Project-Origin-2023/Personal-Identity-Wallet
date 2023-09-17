import axios from 'axios';
import ViewModel from './ViewModel';

class RegisterViewModel extends ViewModel{
  async register(email, password) {
    try {
      const response = await axios.post(`${this.apiUrl}/auth/register`, {
        email: email,
        password: password,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default RegisterViewModel;
