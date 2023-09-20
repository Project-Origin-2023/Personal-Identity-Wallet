import axios from 'axios';
import ViewModel from './ViewModel';

class ServiceIseeViewModel extends ViewModel{

  async verifyauth(token){
    try {
      const response = await axios.get(`${this.apiUrl}/protected`, {
        headers: {
          'Authorization': 'Bearer '+token
        },
      });
      return {success:true,description:"token Valid, Congratulations ;)"}
    } catch (error) {
      return {success:false,description:"token NOT Valid"}
    }
  }
}

export default ServiceIseeViewModel;
