class ViewModel {
    constructor() {
        // Configura l'URL del tuo backend per l'autenticazione
        this.apiUrl = import.meta.env.VITE_APIURL;
    }

    getApiUrl(){
        return this.apiUrl;
    }
}

export default ViewModel;