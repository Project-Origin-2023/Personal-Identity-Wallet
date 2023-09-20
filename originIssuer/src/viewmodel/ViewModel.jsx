class ViewModel {
    constructor() {
        // Configura l'URL del tuo backend per l'autenticazione
        this.apiUrl = 'http://api.issuer.origin';
        //this.apiUrl = 'http://localhost:3000';
    }

    getApiUrl(){
        return this.apiUrl;
    }
}

export default ViewModel;