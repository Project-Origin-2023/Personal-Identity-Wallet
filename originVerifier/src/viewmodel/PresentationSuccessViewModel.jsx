import axios from 'axios';
import ViewModel from './ViewModel';

class PresentationSuccessViewModel extends ViewModel{
  async getPresentationSuccess(access_token) {
    try {
      const response = await axios.get(`${this.apiUrl}/auth?access_token=${access_token}`);
      return {success:true,description:"Presention Success Information Found",data:response.data};
  
    } catch (error) {
      return {success:false,description:error.response.data,data:null};
    }
  }
}

export default PresentationSuccessViewModel;
