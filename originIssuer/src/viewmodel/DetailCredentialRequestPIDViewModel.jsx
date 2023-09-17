import axios from 'axios';
import ViewModel from './ViewModel';

class DetailCredentialRequestPIDViewModel extends ViewModel{
  async getVC(id, jwtToken) {
    try {
      const response = await axios.get(this.apiUrl+'/vcsrequest/pid/'+id , {
        headers: {
          "x-access-token": `${jwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async getVCStatus(id, jwtToken){
    try {
      const response = await axios.get(this.apiUrl+'/vcsrequest/status/'+id , {
        headers: {
          "x-access-token": `${jwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async releaseVC(id,wallet, jwtToken){
    try {
      const response = await axios.get(this.apiUrl+'/vcsrequest/release/'+id+'?wallet='+wallet , {
        headers: {
          "x-access-token": `${jwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async releaseVCCrossDevice(id, jwtToken){
    try {
      const response = await axios.get(this.apiUrl+'/vcsrequest/releasecrossdevice/'+id, {
        headers: {
          "x-access-token": `${jwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async getWalletList(jwtToken){
    try {
      const response = await axios.get(this.apiUrl+'/ci/info/wallets', {
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

export default DetailCredentialRequestPIDViewModel;