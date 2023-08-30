const { Authentication } = require('./authentication/Authentication.js')
const { DatabaseStrategy } = require('./dataScrapper/DatabaseStrategy.js');
const { DataScrapper } = require('./dataScrapper/DataScrapper.js')
const { OpenIdController } = require('./openid/OpenIdController.js')
const { DataResponse } = require('./DataResponse.js');

class Routing{
    #cors = require('cors');
    #express = require('express');
    #bodyParser = require('body-parser');
    #app;
    #auth;
    #scrapper;
    #oidc;
    constructor(){
        //Initialize cors ootion with origin parameter
        var corsOptions = {
            origin: 'http://localhost:19001',
        };
        this.#app = this.#express();
        this.#app.use(this.#bodyParser.json());
        this.#app.use(this.#cors(corsOptions));
        //Authetication
        this.#auth = new Authentication("Secret",3000);
        //Data Scrapper
        this.#scrapper = new DataScrapper();
        try{
            this.#scrapper.setStrategy(new DatabaseStrategy());
        }catch(e){
            console.log("Error DB Connection")
        }
        //OpenId
        this.#oidc = new OpenIdController();

    }

    listen(port){
        this.#app.listen(port, () => {
            console.log('Server is running on port '+port);
        });
    }

    async configEndpoint(){
        //Auth Login
        this.#app.post('/auth/login', async (req, res) => {
            const { email, password } = req.body;
            //Verifica dati input
            // Verifica dati di input (presenza ed esistenza)
            if (!email || email.trim() === '') {
                res.status(500).json({ success: false, message: 'email Login Missing' });
                res.end();return;
            }
            if( !password || password.trim() === ''){
                res.status(500).json({ success: false, message: 'password Login Missing' });
                res.end();return;
            }
            //Verifico nr parametri correttamente
            //TODO

            var response = await this.#auth.login(email,password)
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            }else{
                var token = response.data;
                this.#auth.addTokenCookie(res,token);
                res.status(200).json(response);
                res.end();return;
            }
        });

        //Auth Register
        this.#app.post('/auth/register', async (req, res) => {
            const { email, password } = req.body;
            //Verifica Dati Input
            // Verifica dati di input (presenza ed esistenza)
            if (!email || email.trim() === '') {
                res.status(500).json({ success: false, message: 'email Register Missing' });
                res.end();return;
            }
            if( !password || password.trim() === ''){
                res.status(500).json({ success: false, message: 'password Register Missing' });
                res.end();return;
            }
            //Verifico nr parametri correttamente
            //TODO

            var response = await this.#auth.register(email,password)
            if(!response.success){
                res.status(500).json(response);
                res.end();return;
            }else{
                var token = response.data;
                this.#auth.addTokenCookie(res,token);
                res.status(200).json(response);
                res.end();return;
            }
        });

        //Get VCS Requests Mar
        this.#app.get('/vcsrequests/marital',this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json({ success: false, description: 'Sys_Admin Authorization, lgo in with an User Account' });
                res.end();return;
            }
            //Prendo le vcs request marital status
            var result = await this.#scrapper.getVCSRequestsMarByUserId(req.jwtAccountId);
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        });  
        
        //Get VCS Requests Pid
        this.#app.get('/vcsrequests/pid',this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json({ success: false, description: 'Sys_Admin Authorization, lgo in with an User Account' });
                res.end();return;
            }
            //Prendo le vcs request pid
            var result = await this.#scrapper.getVCSRequestsPidByUserId(req.jwtAccountId);
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        });

        //Get VCS Request verification stuatus
        this.#app.get(['/vcsrequest/status/:id','/vcsrequest/status/'],this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json({ success: false, description: 'Sys_Admin Authorization, log in with an User Account' });
                res.end();return;
            }

            const id = req.params.id // This is how you access URL variable
            // Verifica dati di input (presenza ed esistenza)
            if (!id || id.trim() === '') {
                res.status(500).json({ success: false, message: 'vcs request ID Missing' });
                res.end();return;
            }
            
            //Prendo la vcs request verification
            var result = await this.#scrapper.getVCSRequestVerification(id);
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        });

        //POST VCS Request Pid
        this.#app.post('/vcsrequest/pid',this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json({ success: false, description: 'Sys_Admin Authorization, log in with an User Account' });
                res.end();return;
            }
            //applicantId,currentAddress,dateOfBirth,familyName,firstName,gender,nameAndFamilyNameAtBirth,personalIdentifier
            const { currentAddress,dateOfBirth,familyName,firstName,gender,nameAndFamilyNameAtBirth,personalIdentifier,placeOfBirth} = req.body;
            //Verifica dati input
            // Verifica dati di input (presenza ed esistenza)
            if (!currentAddress || currentAddress.trim() === '') {
                res.status(500).json({ success: false, message: 'Email Login Missing' });
                res.end();return;
            }
            if (!dateOfBirth || dateOfBirth.trim() === '') {
                res.status(500).json({ success: false, message: 'Email Login Missing' });
                res.end();return;
            }
            if (!familyName || familyName.trim() === '') {
                res.status(500).json({ success: false, message: 'Email Login Missing' });
                res.end();return;
            }
            if (!firstName || firstName.trim() === '') {
                res.status(500).json({ success: false, message: 'Email Login Missing' });
                res.end();return;
            }
            if (!gender || gender.trim() === '') {
                res.status(500).json({ success: false, message: 'Email Login Missing' });
                res.end();return;
            }
            if (!nameAndFamilyNameAtBirth || nameAndFamilyNameAtBirth.trim() === '') {
                res.status(500).json({ success: false, message: 'Email Login Missing' });
                res.end();return;
            }
            if (!personalIdentifier || personalIdentifier.trim() === '') {
                res.status(500).json({ success: false, message: 'Email Login Missing' });
                res.end();return;
            }

            //Prendo le vcs request pid
            var result = await this.#scrapper.insertVCSRequestPid(req.jwtAccountId,currentAddress,dateOfBirth,familyName,firstName,gender,nameAndFamilyNameAtBirth,personalIdentifier,placeOfBirth);
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        });

        //POST VCS Request Marital
        this.#app.post('/vcsrequest/marital',this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json({ success: false, description: 'Sys_Admin Authorization, log in with an User Account' });
                res.end();return;
            }
            //applicantId,status,personalIdentifier
            const {status,personalIdentifier} = req.body;
            //Verifica dati input
            // Verifica dati di input (presenza ed esistenza)
            if (!status || status.trim() === '') {
                res.status(500).json({ success: false, message: 'status Missing' });
                res.end();return;
            }
            if (!personalIdentifier || personalIdentifier.trim() === '') {
                res.status(500).json({ success: false, message: 'personalIdentifier Missing' });
                res.end();return;
            }

            //Prendo le vcs request pid
            var result = await this.#scrapper.insertVCSRequestMar(req.jwtAccountId,status,personalIdentifier);
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        });

        //Get VCS Request Release
        this.#app.get(['/vcsrequest/release/:id','/vcsrequest/release/'],this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json(new DataResponse(false,"Sys_Admin Authorization not valid, log in with an User Account"));
                res.end();return;
            }

            var wallet = req.query.wallet;
            //Verifica dati input
            // Verifica se presente un wallet, se non presente imposto il wallet di default origin
            if (!wallet || wallet.trim() === '') {
                wallet = "origin"
            }

            const id = req.params.id // This is how you access URL variable
            // Verifica dati di input (presenza ed esistenza)
            if (!id || id.trim() === '') {
                res.status(500).json(new DataResponse(false,"vcs request id is missing"));
                res.end();return;
            }
            
            //Prendo la vcs request verification
            var result = await this.#scrapper.getVCSRequestVerification(id);
            if(!result.success){//caso in cui la vcs request does not exists
                res.status(500).json(result);
                res.end();return;
            }
            //Verifico che la richiesta di release della vcs request corrisponda ad una vcs request del utente loggato
            if (result.data.pending){//caso in cui vcs request non è stata ancora esaminata da un sys admin ed è in pending
                res.status(500).json(new DataResponse(false,"vcs request verification in pending"));
                res.end();return;
            } 
            if(req.jwtAccountId != result.data.applicant){
                res.status(500).json(new DataResponse(false,"vcs request is not for the account logged in"));
                res.end();return;
            }
            if (!result.data.status){//caso in cui vcs request è stata esaminata con esito negativo
                res.status(500).json(new DataResponse(false,"vcs request verification status negative"));
                res.end();return;
            } 
            if (result.data.released){//caso in cui vcs request già stata rilasciata
                res.status(500).json(new DataResponse(false,"vcs request already released"));
                res.end();return;
            }
            //Post condizioni, vcs request esistente, verificata con esito positivo e non già rilasciata

            // get vcs credential request, if it's not pid is marital
            var credential;
            result = await this.#scrapper.getVCSRequestPidById(id);
            if(result.success){
                credential = await this.#oidc.createCredential(result.data,"PID");
            }else{
                result = await this.#scrapper.getVCSRequestMarById(id);
                if(result.success){  
                    var dataCredential = {status:result.data[0].status, personalIdentifier:result.data[0].personalIdentifier};
                    credential = await this.#oidc.createCredential(dataCredential,"EAA");
                } 
            }
        
            //release vcs request with openid
            var result = await this.#oidc.issueCredentialSameDevice(wallet,credential);
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }

            //update vcs request realeased in DB
            var resultUpdate = await this.#scrapper.updateVCSRequestReleased(id,true);
            if(!resultUpdate.success){
                res.status(500).json(resultUpdate);
                res.end();return;
            }
            //Ritorno i risultati
            res.status(200).json(new DataResponse(true,"Credential Issuing initiated, see data for redirect link to wallet",result.data));
            res.end();return;
        });

        //Admin all or user's get vcs request PID
        this.#app.get(['/vcsrequest/pid/:id','/vcsrequest/pid/','/admin/vcsrequest/pid/:id','/admin/vcsrequest/pid/'],this.#auth.decodeToken, async (req, res) => {
            const id = req.params.id // This is how you access URL variable
            // Verifica dati di input (presenza ed esistenza)
            if (!id || id.trim() === '') {
                res.status(500).json(new DataResponse(false,"vcs request id is missing"));
                res.end();return;
            }
            //Prendo le vcs request marital status
            var result = await this.#scrapper.getVCSRequestPidById(id);
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Se è un Sys Admin, ha i permessi di ottenere in ogni caso la vcs request, se è un user deve essere la propria vcs request
            if(!req.jwtSysAdmin){
                if(result.data.applicant != jwtAccountId){
                    res.status(500).json(new DataResponse(false,"vcs request is not own by account logged in"));
                    res.end();return;
                }
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        }); 

        //Admin all or user's get vcs request Marital status
        this.#app.get(['/vcsrequest/marital/:id','/vcsrequest/marital/','/admin/vcsrequest/marital/:id','/admin/vcsrequest/marital/'],this.#auth.decodeToken, async (req, res) => {
            const id = req.params.id // This is how you access URL variable
            // Verifica dati di input (presenza ed esistenza)
            if (!id || id.trim() === '') {
                res.status(500).json(new DataResponse(false,"vcs request id is missing"));
                res.end();return;
            }
            //Prendo le vcs request marital status
            var result = await this.#scrapper.getVCSRequestMarById(id);
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Se è un Sys Admin, ha i permessi di ottenere in ogni caso la vcs request, se è un user deve essere la propria vcs request
            if(!req.jwtSysAdmin){
                if(result.data.applicant != jwtAccountId){
                    res.status(500).json(new DataResponse(false,"vcs request is not own by account logged in"));
                    res.end();return;
                }
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        }); 

        //Admin make verification of a vcs request
        this.#app.post('/admin/vcsrequest/verify',this.#auth.decodeToken, async (req, res) => {
            //Verifico che sia un Sys_admin
            if(!req.jwtSysAdmin){
                res.status(500).json({ success: false, description: 'Sys_Admin Authorization required' });
                res.end();return;
            }
            if(req.jwtRole!="verifier"){
                res.status(500).json({ success: false, description: 'Sys_Admin Verifier Authorization required, check your department for optain permission' });
                res.end();return;
            }
            //applicantId,status,personalIdentifier
            const {vcsrequestId, status} = req.body;
            //Verifica dati input
            // Verifica dati di input (presenza ed esistenza)
            if (!vcsrequestId || vcsrequestId.trim() === '') {
                res.status(500).json({ success: false, message: 'vcsrequestId Missing' });
                res.end();return;
            }
            if (!status || status.trim() === '') {
                res.status(500).json({ success: false, message: 'status Missing' });
                res.end();return;
            }
            //Insert vcs request verification
            var result = await this.#scrapper.insertVCSRequestVerification(vcsrequestId,req.jwtAccountId,status);
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        });

        //Admin See all vcs request verified also not in pending
        this.#app.get('/admin/vcsrequest/notpending',this.#auth.decodeToken, async (req, res) => {
            //Verifico che sia un Sys_admin
            if(!req.jwtSysAdmin){
                res.status(500).json({ success: false, description: 'Sys_Admin Authorization required, log in with an Sys Admin Account' });
                res.end();return;
            }
            if(req.jwtRole!="verifier"){
                res.status(500).json({ success: false, description: 'Sys_Admin Verifier Authorization required, check your department for optain permission' });
                res.end();return;
            }

            //Prendo le vcs request pid
            var result = await this.#scrapper.getVCSRequestNotPending();
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        });

        //Admin See all vcs request not verified also in pending
        this.#app.get('/admin/vcsrequest/pending',this.#auth.decodeToken, async (req, res) => {
            //Verifico che sia un Sys_admin
            if(!req.jwtSysAdmin){
                res.status(500).json({ success: false, description: 'Sys_Admin Authorization required, log in with an Sys Admin Account' });
                res.end();return;
            }
            if(req.jwtRole!="verifier"){
                res.status(500).json({ success: false, description: 'Sys_Admin Verifier Authorization required, check your department for optain permission' });
                res.end();return;
            }

            //Prendo le vcs request pid
            var result = await this.#scrapper.getVCSRequestPending();
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