import axios from 'axios';
import ViewModel from './ViewModel';

class ConnectViewModel extends ViewModel{
  async getWallets() {
    try {
      const response = await axios.get(`${this.apiUrl}/config/getConfiguration`);
      return response.data.wallets;
  
    } catch (error) {
      return error.response.data;
    }
  }

  async present(wallet, type) {
    try {
      const response = await axios.get(`${this.apiUrl}/present/?walletId=${wallet}&vcType=${type}`);
      return response.data;
  
    } catch (error) {
      return error.response.data;
    }
  }

  async presentxdevice(type) {
    try {
      const response = await axios.get(`${this.apiUrl}/presentXDevice/?vcType=${type}`);
      return response.data;
  
    } catch (error) {
      return error.response.data;
    }
  }
}

export default ConnectViewModel;
