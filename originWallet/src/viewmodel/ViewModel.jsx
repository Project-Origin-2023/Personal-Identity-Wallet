import axios from 'axios';

class ViewModel {
    constructor() {

        // Configura l'URL del tuo backend per l'autenticazione
        this.apiUrl = import.meta.env.VITE_APIURL;
    }

    async refreshAuth(jwtToken){
        try {
            var response = await axios.get(this.apiUrl+'/auth/refresh', {
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

export default ViewModel;