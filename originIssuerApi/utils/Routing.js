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

            //Effettuo Richieste
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

        /**
         * Get VCS (Verification of Marital Status) Requests for User.
         *
         * @param {Object} req - The HTTP request object with a decoded JWT token.
         * @param {Object} res - The HTTP response object.
         * @returns {Object} An object containing the result of the VCS requests retrieval.
         *                   If successful, it includes marital status requests for the user.
         *                   If unsuccessful, it includes an error message.
         */
        //Get VCS Requests Marital
        this.#app.get('/vcsrequests/marital',this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json(new DataResponse(false,"Sys_Admin Authorization, log in with an User Account"));
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
        
        /**
         * Get VCS (Verification of Personal Identification) Requests for User.
         *
         * @param {Object} req - The HTTP request object with a decoded JWT token.
         * @param {Object} res - The HTTP response object.
         * @returns {Object} An object containing the result of the VCS requests retrieval.
         *                   If successful, it includes personal identification requests for the user.
         *                   If unsuccessful, it includes an error message.
         */
        //Get VCS Requests Pid
        this.#app.get('/vcsrequests/pid',this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json(new DataResponse(false,"Sys_Admin Authorization, log in with an User Account"));
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

        /**
         * Get VCS (Verification of Request Verification Status) Request Status.
         *
         * @param {Object} req - The HTTP request object with a decoded JWT token.
         * @param {Object} res - The HTTP response object.
         * @param {string} req.params.id - The ID of the VCS request whose status is to be retrieved.
         * @returns {Object} An object containing the result of the VCS request status retrieval.
         *                   If successful, it includes the verification status of the request.
         *                   If unsuccessful or if the request ID is missing, it includes an error message.
         */
        //Get VCS Request verification stuatus
        this.#app.get(['/vcsrequest/status/:id','/vcsrequest/status/'],this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json;
                res.end();return;
            }

            const id = req.params.id // This is how you access URL variable
            // Verifica dati di input (presenza ed esistenza)
            if (!id || id.trim() === '') {
                res.status(500).json(new DataResponse(false,"id Missing"));
                res.end();return;
            }
            if(!this.#inputChecker.checkInteger(id)){
                res.status(500).json(new DataResponse(false,"id format not valid"));
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

        /**
         * POST a VCS (Verification of Personal Identification) Request.
         *
         * @param {Object} req - The HTTP request object with a decoded JWT token.
         * @param {Object} res - The HTTP response object.
         * @param {string} req.body.currentAddress - The current address of the applicant.
         * @param {string} req.body.dateOfBirth - The date of birth of the applicant.
         * @param {string} req.body.familyName - The family name of the applicant.
         * @param {string} req.body.firstName - The first name of the applicant.
         * @param {string} req.body.gender - The gender of the applicant.
         * @param {string} req.body.nameAndFamilyNameAtBirth - The name and family name at birth of the applicant.
         * @param {string} req.body.personalIdentifier - The personal identifier of the applicant.
         * @param {string} req.body.placeOfBirth - The place of birth of the applicant.
         * @returns {Object} An object containing the result of the VCS request insertion.
         *                   If successful, it includes a success message.
         *                   If unsuccessful or if any required input is missing or not valid, it includes an error message.
         */
        //POST VCS Request Pid
        this.#app.post('/vcsrequest/pid',this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json(new DataResponse(false,"Sys_Admin Authorization, log in with an User Account"));
                res.end();return;
            }
            //applicantId,currentAddress,dateOfBirth,familyName,firstName,gender,nameAndFamilyNameAtBirth,personalIdentifier
            const { currentAddress,dateOfBirth,familyName,firstName,gender,nameAndFamilyNameAtBirth,personalIdentifier,placeOfBirth} = req.body;
            //Verifica dati input
            // Verifica dati di input (presenza ed esistenza)
            if (!currentAddress || currentAddress.trim() === '') {
                res.status(500).json(new DataResponse(false,"currentAddress Missing"));
                res.end();return;
            }
            if (!dateOfBirth || dateOfBirth.trim() === '') {
                res.status(500).json(new DataResponse(false,"dateOfBirth Missing"));
                res.end();return;
            }
            if (!familyName || familyName.trim() === '') {
                res.status(500).json(new DataResponse(false,"familyName Missing"));
                res.end();return;
            }
            if (!firstName || firstName.trim() === '') {
                res.status(500).json(new DataResponse(false,"firstName Missing"));
                res.end();return;
            }
            if (!gender || gender.trim() === '') {
                res.status(500).json(new DataResponse(false,"gender Missing"));
                res.end();return;
            }
            if (!nameAndFamilyNameAtBirth || nameAndFamilyNameAtBirth.trim() === '') {
                res.status(500).json(new DataResponse(false,"nameAndFamilyNameAtBirth Missing"));
                res.end();return;
            }
            if (!personalIdentifier || personalIdentifier.trim() === '') {
                res.status(500).json(new DataResponse(false,"personalIdentifier Missing"));
                res.end();return;
            }
            if (!placeOfBirth || placeOfBirth.trim() === '') {
                res.status(500).json(new DataResponse(false,"placeOfBirth Missing"));
                res.end();return;
            }
            //Verifico nr parametri correttamente
            if(!this.#inputChecker.checkString(currentAddress)){
                res.status(500).json(new DataResponse(false,"currentAddress format not valid"));
                res.end();return;
            }
            if(!this.#inputChecker.checkDate(dateOfBirth)){
                res.status(500).json(new DataResponse(false,"dateOfBirth format not valid"));
                res.end();return;
            }
            if(!this.#inputChecker.checkName(familyName)){
                res.status(500).json(new DataResponse(false,"familyName format not valid"));
                res.end();return;
            }
            if(!this.#inputChecker.checkName(firstName)){
                res.status(500).json(new DataResponse(false,"firstName format not valid"));
                res.end();return;
            }

            if(!this.#inputChecker.checkGender(gender)){
                res.status(500).json(new DataResponse(false,"gender format not valid"));  
                res.end();return;
            }
            if(!this.#inputChecker.checkName(nameAndFamilyNameAtBirth)){
                res.status(500).json(new DataResponse(false,"nameAndFamilyNameAtBirth format not valid"));
                res.end();return;
            }
            if(!this.#inputChecker.checkString(personalIdentifier)){
                res.status(500).json(new DataResponse(false,"personalIdentifier format not valid"));
                res.end();return;
            }
            if(!this.#inputChecker.checkString(placeOfBirth)){
                res.status(500).json(new DataResponse(false,"placeOfBirth format not valid"));
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

        /**
         * POST a VCS (Verification of Marital Status) Request.
         *
         * @param {Object} req - The HTTP request object with a decoded JWT token.
         * @param {Object} res - The HTTP response object.
         * @param {boolean} req.body.status - The marital status to be verified.
         * @param {string} req.body.personalIdentifier - The personal identifier of the applicant.
         * @returns {Object} An object containing the result of the VCS request insertion.
         *                   If successful, it includes a success message.
         *                   If unsuccessful or if any required input is missing or not valid, it includes an error message.
         */
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
                res.status(500).json(new DataResponse(false,"status Missing"));
                res.end();return;
            }
            if (!personalIdentifier || personalIdentifier.trim() === '') {
                res.status(500).json(new DataResponse(false,"personalIdentifier Missing"));
                res.end();return;
            }
            
            //Verifico nr parametri correttamente
            if(!this.#inputChecker.checkString(personalIdentifier)){
                res.status(500).json(new DataResponse(false,"personalIdentifier format not valid"));
                res.end();return;
            }
            if(!this.#inputChecker.checkMaritalStatus(status)){
                res.status(500).json(new DataResponse(false,"maritalstatus format not valid"));
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

        /**
         * Get VCS (Verification of Credential Status) Request Release.
         *
         * @param {Object} req - The HTTP request object with a decoded JWT token.
         * @param {Object} res - The HTTP response object.
         * @param {string} [req.query.wallet=origin] - The wallet to use for releasing the VCS request credential.
         * @param {string} req.params.id - The ID of the VCS request whose credential is to be released.
         * @returns {Object} An object containing the result of the VCS request credential release process.
         *                   If successful, it includes a success message and the credential issuance data.
         *                   If unsuccessful or if the request ID is missing, it includes an error message.
         */
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
            if(!this.#inputChecker.checkString(wallet)){
                res.status(500).json(new DataResponse(false,"wallet format not valid"));
                res.end();return;
            }

            const id = req.params.id // This is how you access URL variable
            // Verifica dati di input (presenza ed esistenza)
            if (!id || id.trim() === '') {
                res.status(500).json(new DataResponse(false,"id Missing"));
                res.end();return;
            }
            //Verifico nr parametri correttamente
            if(!this.#inputChecker.checkInteger(id)){
                res.status(500).json(new DataResponse(false,"id format not valid"));
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
                credential = await this.#oidc.createCredential(result.data.vcs_request,"PID");
            }else{
                result = await this.#scrapper.getVCSRequestMarById(id);
                if(result.success){  
                    var dataCredential = {status:result.data.vcs_request.status, personalIdentifier:result.data.vcs_request.personalIdentifier};
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

        /**
         * Get a VCS (Verification of Personal Identification) Request by ID.
         *
         * @param {Object} req - The HTTP request object with a decoded JWT token.
         * @param {Object} res - The HTTP response object.
         * @param {string} req.params.id - The ID of the VCS request to retrieve.
         * @returns {Object} An object containing the result of the VCS request retrieval.
         *                   If successful, it includes the VCS request details.
         *                   If unsuccessful, it includes an error message.
         */
        //Admin all or user's get vcs request PID
        this.#app.get(['/vcsrequest/pid/:id','/vcsrequest/pid/','/admin/vcsrequest/pid/:id','/admin/vcsrequest/pid/'],this.#auth.decodeToken, async (req, res) => {
            const id = req.params.id; // This is how you access URL variable
            // Verifica dati di input (presenza ed esistenza)
            if (!id || id.trim() === '') {
                res.status(500).json(new DataResponse(false,"id Missing"));
                res.end();return;
            }
            //Verifico nr parametri correttamente
            if(!(this.#inputChecker.checkInteger(id))){
                res.status(500).json(new DataResponse(false,"id format not valid"));
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
                if(result.data.vcs_request.applicant != req.jwtAccountId){
                    res.status(500).json(new DataResponse(false,"vcs request is not own by account logged in"));
                    res.end();return;
                }
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        }); 

        /**
         * Get a VCS (Verification of Marital Status) Request by ID.
         *
         * @param {Object} req - The HTTP request object with a decoded JWT token.
         * @param {Object} res - The HTTP response object.
         * @param {string} req.params.id - The ID of the VCS request to retrieve.
         * @returns {Object} An object containing the result of the VCS request retrieval.
         *                   If successful, it includes the VCS request details.
         *                   If unsuccessful, it includes an error message.
         */
        //Admin all or user's get vcs request Marital status
        this.#app.get(['/vcsrequest/marital/:id','/vcsrequest/marital/','/admin/vcsrequest/marital/:id','/admin/vcsrequest/marital/'],this.#auth.decodeToken, async (req, res) => {
            const id = req.params.id // This is how you access URL variable
            // Verifica dati di input (presenza ed esistenza)
            if (!id || id.trim() === '') {
                res.status(500).json(new DataResponse(false,"id Missing"));
                res.end();return;
            }
            //Verifico nr parametri correttamente
            if(!this.#inputChecker.checkInteger(id)){
                res.status(500).json(new DataResponse(false,"id format not valid"));
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
                if(result.data.vcs_request.applicant != req.jwtAccountId){
                    res.status(500).json(new DataResponse(false,"vcs request is not own by account logged in"));
                    res.end();return;
                }
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        }); 

        /**
         * Admin Verify a VCS (Verification of Credential Status) Request.
         *
         * @param {Object} req - The HTTP request object with a decoded JWT token.
         * @param {Object} res - The HTTP response object.
         * @param {string} req.body.vcsrequestId - The ID of the VCS request to be verified.
         * @param {boolean} req.body.status - The verification status (true or false).
         * @returns {Object} An object containing the result of the VCS request verification process.
         *                   If successful, it includes a success message.
         *                   If unsuccessful or if any required input is missing or not valid, it includes an error message.
         */
        //Admin make verification of a vcs request
        this.#app.post('/admin/vcsrequest/verify',this.#auth.decodeToken, async (req, res) => {
            //Verifico che sia un Sys_admin
            if(!req.jwtSysAdmin){
                res.status(500).json(new DataResponse(false,"Sys_Admin Authorization required, log in with an Sys Admin Account"))
                res.end();return;
            }
            if(req.jwtRole!="verifier"){
                res.status(500).json(new DataResponse(false,"Sys_Admin Verifier Authorization required, check your department for optain permission"));
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
            //Verifico nr parametri correttamente
            if(!this.#inputChecker.checkInteger(vcsrequestId)){
                res.status(500).json({ success: false, message: 'vcsrequestId format not valid' });
                res.end();return;
            }
            if(!this.#inputChecker.checkBoolean(status)){
                res.status(500).json({ success: false, message: 'status format not valid' });
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

        /**
         * Admin Get All VCS (Verification of Credential Status) Requests that are not in pending state.
         *
         * @param {Object} req - The HTTP request object with a decoded JWT token.
         * @param {Object} res - The HTTP response object.
         * @returns {Object} An object containing the result of retrieving VCS requests that are not in pending state.
         *                   If successful, it includes a list of VCS requests.
         *                   If unsuccessful or if the requester is not a Sys_Admin with the "verifier" role, it includes an error message.
         */
        //Admin See all vcs request verified also not in pending
        this.#app.get('/admin/vcsrequests/notpending',this.#auth.decodeToken, async (req, res) => {
            //Verifico che sia un Sys_admin
            if(!req.jwtSysAdmin){
                res.status(500).json(new DataResponse(false,"Sys_Admin Authorization required, log in with an Sys Admin Account"));
                res.end();return;
            }
            if(req.jwtRole!="verifier"){
                res.status(500).json(new DataResponse(false,"Sys_Admin Verifier Authorization required, check your department for optain permission"));
                res.end();return;
            }

            //Prendo le vcs request pid
            var result = await this.#scrapper.getVCSRequestsNotPending();
            if(!result.success){
                res.status(500).json(result);
                res.end();return;
            }
            //Ritorno i risultati
            res.status(200).json(result);
            res.end();return;
        });

        /**
         * Admin Get All VCS (Verification of Credential Status) Requests that are in pending state or not verified.
         *
         * @param {Object} req - The HTTP request object with a decoded JWT token.
         * @param {Object} res - The HTTP response object.
         * @returns {Object} An object containing the result of retrieving VCS requests that are in pending state or not verified.
         *                   If successful, it includes a list of VCS requests.
         *                   If unsuccessful or if the requester is not a Sys_Admin with the "verifier" role, it includes an error message.
         */
        //Admin See all vcs request not verified also in pending
        this.#app.get('/admin/vcsrequests/pending',this.#auth.decodeToken, async (req, res) => {
            //Verifico che sia un Sys_admin
            if(!req.jwtSysAdmin){
                res.status(500).json(new DataResponse(false,"Sys_Admin Authorization required, log in with an Sys Admin Account"));
                res.end();return;
            }
            if(req.jwtRole!="verifier"){
                res.status(500).json(new DataResponse(false,"Sys_Admin Verifier Authorization required, check your department for optain permission"));
                res.end();return;
            }

            //Prendo le vcs request pid
            var result = await this.#scrapper.getVCSRequestsPending();
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