import axios from 'axios';
import ViewModel from './ViewModel';

class StartPresentationViewModel extends ViewModel{

  async startPresentation(uri,jwtToken){
    try {
      const response = await axios.post(this.apiUrl+'/vp/start',uri, {
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

export default StartPresentationViewModel;