import axios from 'axios';
import ViewModel from './ViewModel';

class DetailCredentialViewModel extends ViewModel{

  async deleteVC(id, jwtToken){
    try {
      const response = await axios.delete(this.apiUrl+'/credential/'+id , {
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

export default DetailCredentialViewModel;