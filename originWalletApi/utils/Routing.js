const { Authentication } = require('./authentication/Authentication.js')
const { DatabaseStrategy } = require('./dataScrapper/DatabaseStrategy.js');
const { DataScrapper } = require('./dataScrapper/DataScrapper.js')
const { OpenIdController } = require('./openid/OpenIdController.js')
const { DataResponse } = require('./DataResponse.js');
const { InputChecker } = require('./InputChecker.js');

class Routing{
    #cors = require('cors');
    #express = require('express');
    #bodyParser = require('body-parser');
    #app;
    #auth;
    #scrapper;
    #oidc;
    #inputChecker;
    constructor(){
        //Initialize cors option with origin parameter
        var corsOptions = {
            origin: process.env.CORSORIGIN,
        };
        this.#app = this.#express();
        this.#app.use(this.#bodyParser.json());
        this.#app.use(this.#cors(corsOptions));
        //Authetication
        this.#auth = new Authentication(process.env.TOKEN_SECRET,process.env.TOKEN_EXPIRE);
        //Data Scrapper
        this.#scrapper = new DataScrapper();
        try{
            this.#scrapper.setStrategy(new DatabaseStrategy());
        }catch(e){
            console.log("Error DB Connection")
        }
        //OpenId
        this.#oidc = new OpenIdController();
        //Input Checker
        this.#inputChecker = new InputChecker();

    }

    listen(port){
        this.#app.listen(port, () => {
            console.log('Server is running on port '+port);
        });
    }

    async configEndpoint(){
        
        /**
         * Endpoint for User Login.
         * 
         * @param {Object} req - The HTTP request object.
         * @param {Object} res - The HTTP response object.
         * @param {string} req.body.email - User's email address for login.
         * @param {string} req.body.password - User's password for login.
         * @returns {Object} An object containing the result of the login attempt. 
         *                   If successful, it includes a token and a success message.
         *                   If unsuccessful, it includes an error message.
         */
        //Auth Login
        this.#app.get('/auth/refresh',this.#auth.decodeToken, async (req, res) => {
            //Get parametri da token attuale
            let email = req.jwtAccountEmail;
            let oldtokenOIDC = req.jwtTokenOIDC;
            //refresh token OIDC
            let response = await this.#oidc.refreshAuth(email,oldtokenOIDC);
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            }
            var tokenOIDC = response.data.token;

            //Effettuo Richiesta refresh
            response = await this.#auth.refreshAuth(email,tokenOIDC)
            if(response.success){
                res.status(200).json(response);
                res.end();return;
            }
            res.status(500).json(response);
            res.end();return;
         
        });

        /**
         * Endpoint for User Login.
         * 
         * @param {Object} req - The HTTP request object.
         * @param {Object} res - The HTTP response object.
         * @param {string} req.body.email - User's email address for login.
         * @param {string} req.body.password - User's password for login.
         * @returns {Object} An object containing the result of the login attempt. 
         *                   If successful, it includes a token and a success message.
         *                   If unsuccessful, it includes an error message.
         */
        //Auth Login
        this.#app.post('/auth/login', async (req, res) => {
            const { email, password } = req.body;
            //Verifica dati input
            // Verifica dati di input (presenza ed esistenza)
            if (!email || email.trim() === '') {
                res.status(500).json(new DataResponse(false,"email Missing"));
                res.end();return;
            }
            if( !password || password.trim() === ''){
                res.status(500).json(new DataResponse(false,"password Missing"));
                res.end();return;
            }
            //Verifico parametri correttamente
            if(!this.#inputChecker.checkEmail(email)){
                res.status(500).json(new DataResponse(false,"email format not valid"));
                res.end();return;
            }
            if(!this.#inputChecker.checkPassword(password)){
                res.status(500).json(new DataResponse(false,"password format not valid"));
                res.end();return;
            }

            //Effettuo Richiesta OpenID per richiesta token e creazione spazio wallet
            let response = await this.#oidc.login(email,password);
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            }
            var tokenOIDC = response.data.token;

            //Effettuo Richieste
            response = await this.#auth.login(email,password,tokenOIDC)
            if(response.success){
                res.status(200).json(response);
                res.end();return;
            }
            res.status(500).json(response);
            res.end();return;
         
        });

        /**
         * Endpoint for User Registration.
         * 
         * @param {Object} req - The HTTP request object.
         * @param {Object} res - The HTTP response object.
         * @param {string} req.body.email - User's email address for registration.
         * @param {string} req.body.password - User's password for registration.
         * @returns {Object} An object containing the result of the registration attempt. 
         *                   If successful, it includes a token and a success message.
         *                   If unsuccessful, it includes an error message.
         */
        //Auth Register
        this.#app.post('/auth/register', async (req, res) => {
            const { email, password } = req.body;
            //Verifica Dati Input
            // Verifica dati di input (presenza ed esistenza)
            if (!email || email.trim() === '') {
                res.status(500).json(new DataResponse(false,"email Missing"));
                res.end();return;
            }
            if( !password || password.trim() === ''){
                res.status(500).json(new DataResponse(false,"password Missing"));
                res.end();return;
            }
            //Verifico parametri correttamente
            if(!this.#inputChecker.checkEmail(email)){
                res.status(500).json(new DataResponse(false,"email format not valid"));
                res.end();return;
            }
            if(!this.#inputChecker.checkPassword(password)){
                res.status(500).json(new DataResponse(false,"password format not valid"));
                res.end();return;
            }
            
            //Effettuo Richiesta OpenID per richiesta token e creazione spazio wallet
            let response = await this.#oidc.login(email,password);
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            }
            var tokenOIDC = response.data.token;
            //Effettuo richiesta DID dal wallet openid
            response = await this.#oidc.getUserDid(tokenOIDC);
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            };
            var did=response.data[0];
            //Effettuo richieste inserimento account
            response = await this.#auth.register(email,password,did,tokenOIDC)
            if(response.success){
                res.status(200).json(response);
                res.end();return;
            }
            res.status(500).json(response);
            res.end();return;
        });

        this.#app.get('/ci/continue',this.#auth.decodeToken, async (req, res) => {
            const { sessionId } = req.query;
            // Verifica dati di input (presenza ed esistenza)
            if (!sessionId || sessionId.trim() === '') {
                res.status(500).json(new DataResponse(false,"sessionId Missing"));
                res.end();return;
            }
            //Verifico parametri correttamente
            if(!this.#inputChecker.checkString(sessionId)){
                res.status(500).json(new DataResponse(false,"sessionId format not valid"));
                res.end();return;
            }

            let response = await this.#oidc.continueIssuing(req.jwtAccountDid,sessionId,req.jwtTokenOIDC);
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            }
            res.status(200).json(response);
            res.end();return;
        });

        this.#app.get('/credentials',this.#auth.decodeToken, async (req, res) => {
            let response = await this.#oidc.getCredentialList(req.jwtTokenOIDC);
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            }
            res.status(200).json(response);
            res.end();return;
        });

        this.#app.get('/ci/info/issuance',this.#auth.decodeToken, async (req, res) => {
            const { sessionId } = req.query;
            // Verifica dati di input (presenza ed esistenza)
            if (!sessionId || sessionId.trim() === '') {
                res.status(500).json(new DataResponse(false,"sessionId Missing"));
                res.end();return;
            }
            //Verifico parametri correttamente
            if(!this.#inputChecker.checkString(sessionId)){
                res.status(500).json(new DataResponse(false,"sessionId format not valid"));
                res.end();return;
            }

            let response = await this.#oidc.getIssuanceInfo(sessionId,req.jwtTokenOIDC);
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            }
            res.status(200).json(response);
            res.end();return;
        });

        this.#app.delete('/credential/:id',this.#auth.decodeToken, async (req, res) => {
            const { id } = req.params;
            // Verifica dati di input (presenza ed esistenza)
            if (!id || id.trim() === '') {
                res.status(500).json(new DataResponse(false,"id Missing"));
                res.end();return;
            }
            //Verifico parametri correttamente
            if(!this.#inputChecker.checkString(id)){
                res.status(500).json(new DataResponse(false,"id format not valid"));
                res.end();return;
            }

            let response = await this.#oidc.deleteCredential(id,req.jwtTokenOIDC);
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            }
            res.status(200).json(response);
            res.end();return;
        });

        this.#app.post('/ci/continuexdevice',this.#auth.decodeToken, async (req, res) => {
            //uri
            const {uri} = req.body;
            //Verifica dati input
            // Verifica dati di input (presenza ed esistenza)
            if (!uri || uri.trim() === '') {
                res.status(500).json(new DataResponse(false,"uri Missing"));
                res.end();return;
            }
            
            //Verifico parametri correttamente
            if(!this.#inputChecker.checkString(uri)){
                res.status(500).json(new DataResponse(false,"uri format not valid"));
                res.end();return;
            }

            //continue issuing
            var result = await this.#oidc.continueIssuingXDevice(uri,req.jwtTokenOIDC)
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        });

        this.#app.post('/vp/start',this.#auth.decodeToken, async (req, res) => {
            //uri
            const {uri} = req.body;
            //Verifica dati input
            // Verifica dati di input (presenza ed esistenza)
            if (!uri || uri.trim() === '') {
                res.status(500).json(new DataResponse(false,"uri Missing"));
                res.end();return;
            }
            
            //Verifico parametri correttamente
            if(!this.#inputChecker.checkString(uri)){
                res.status(500).json(new DataResponse(false,"uri format not valid"));
                res.end();return;
            }

            //start presentation
            var result = await this.#oidc.startPresentation(uri,req.jwtTokenOIDC)
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        });

        this.#app.get('/vp/continue',this.#auth.decodeToken, async (req, res) => {
            const { sessionId } = req.query;
            // Verifica dati di input (presenza ed esistenza)
            if (!sessionId || sessionId.trim() === '') {
                res.status(500).json(new DataResponse(false,"sessionId Missing"));
                res.end();return;
            }
            //Verifico parametri correttamente
            if(!this.#inputChecker.checkString(sessionId)){
                res.status(500).json(new DataResponse(false,"sessionId format not valid"));
                res.end();return;
            }

            let response = await this.#oidc.continuePresentation(sessionId,req.jwtAccountDid,req.jwtTokenOIDC);
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            }
            res.status(200).json(response);
            res.end();return;
        });

        this.#app.post('/vp/fulfill',this.#auth.decodeToken, async (req, res) => {
            const { sessionId } = req.query;
            // Verifica dati di input (presenza ed esistenza)
            if (!sessionId || sessionId.trim() === '') {
                res.status(500).json(new DataResponse(false,"sessionId Missing"));
                res.end();return;
            }
            //Verifico parametri correttamente
            if(!this.#inputChecker.checkString(sessionId)){
                res.status(500).json(new DataResponse(false,"sessionId format not valid"));
                res.end();return;
            }
            //uri
            const {claims} = req.body;
            //Verifica dati input
            // Verifica dati di input (presenza ed esistenza)
            if (!claims || claims.length == 0) {
                res.status(500).json(new DataResponse(false,"claims Missing"));
                res.end();return;
            }

            //start presentation
            var result = await this.#oidc.fulfillPresentation(claims,sessionId,req.jwtTokenOIDC)
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        });
        
    }

    get app() {
        return this.#app;
    }
    
}

//Export for public uses
module.exports = {
    Routing:Routing
}