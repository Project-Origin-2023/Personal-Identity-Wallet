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
        //Initialize cors ootion with origin parameter
        var corsOptions = {
            origin: ['http://localhost:5001','http://localhost:5001/'],
        };
        this.#app = this.#express();
        this.#app.use(this.#bodyParser.json());
        this.#app.use(this.#cors(corsOptions));
        //Authetication
        this.#auth = new Authentication("Secret",10000);
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
            //Verifico nr parametri correttamente
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
            response = await this.#auth.login(email,password)
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            }else{
                var token = response.data.token;
                this.#auth.addTokenCookie(res,token);
                this.#auth.addTokenOIDCCookie(res,tokenOIDC);
                res.status(200).json(new DataResponse(true,"Login successfully and tokens retrived",{token:token,tokenOIDC:tokenOIDC}));
                res.end();return;
            }
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
            //Verifico nr parametri correttamente
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
            response = await this.#auth.register(email,password,did)
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            }else{
                var token = response.data.token;
                this.#auth.addTokenCookie(res,token);
                this.#auth.addTokenOIDCCookie(res,tokenOIDC);
                res.status(200).json(response);
                res.end();return;
            }
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