const { Authentication } = require('./authentication/Authentication.js')
const { DatabaseStrategy } = require('./dataScrapper/DatabaseStrategy.js')
const { DataScrapper } = require('./dataScrapper/DataScrapper.js')

class Routing{
    #cors = require('cors');
    #express = require('express');
    #bodyParser = require('body-parser');
    #app;
    #auth;
    #scrapper;
    constructor(){
        var corsOptions = {
            origin: 'http://localhost:19001',
        };
        this.#app = this.#express();
        this.#app.use(this.#bodyParser.json());
        this.#app.use(this.#cors(corsOptions));
        this.#auth = new Authentication("Secret",3000);
        //Data Scrapper
        this.#scrapper = new DataScrapper();
        try{
            this.#scrapper.setStrategy(new DatabaseStrategy());
        }catch(e){
            console.log("Error DB Connection")
        }
    }

    listen(port){
        this.#app.listen(port, () => {
            console.log('Server is running on port '+port);
        });
    }

    #addGetEndpoint(uri,fun){
        this.#app.get(uri, fun);
    }

    #addPostEndpoint(uri,fun){
        this.#app.post(uri, fun);
    }

    async configEndpoint(){
        //Auth Login
        this.#app.post('/auth/login', async (req, res) => {
            const { email, password } = req.body;
            //Verifica dati input
            // Verifica dati di input (presenza ed esistenza)
            if (!email || email.trim() === '') {
                res.status(500).json({ success: false, message: 'Email Login Missing' });
                res.end();
            }
            if( !password || password.trim() === ''){
                res.status(500).json({ success: false, message: 'Password Login Missing' });
                res.end();
            }
            //Verifico nr parametri correttamente
            //TODO

            var response = await this.#auth.login(email,password)
            if(!response.success){
                res.status(500).json(response);
                res.end();
            }else{
                var token = response.data;
                this.#auth.addTokenCookie(res,token);
                res.status(200).json(response);
                res.end();
            }
        });

        //Auth Register
        this.#app.post('/auth/register', async (req, res) => {
            const { email, password } = req.body;
            //Verifica Dati Input
            // Verifica dati di input (presenza ed esistenza)
            if (!email || email.trim() === '') {
                res.status(500).json({ success: false, message: 'Email Register Missing' });
                res.end();
            }
            if( !password || password.trim() === ''){
                res.status(500).json({ success: false, message: 'Password Register Missing' });
                res.end();
            }
            //Verifico nr parametri correttamente
            //TODO

            var response = await this.#auth.register(email,password)
            if(!response.success){
                res.status(500).json(response);
                res.end();
            }else{
                var token = response.data;
                this.#auth.addTokenCookie(res,token);
                res.status(200).json(response);
                res.end();
            }
        });

        //Get VCS Requests Mar
        this.#app.get('/vcsrequest/marital',this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json({ success: false, description: 'Sys_Admin Authorization, lgo in with an User Account' });
                res.end();
            }
            //Prendo le vcs request marital status
            var result = await this.#scrapper.getVCSRequestsMarByUserId(req.jwtAccountId);
            if(!result.success){
                res.status(500).json(result);
                res.end();
            }
            //Ritorno i risultati
            res.status(200).json(result.data);
            res.end();
        });  
        
        //Get VCS Requests Pid
        this.#app.get('/vcsrequest/pid',this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json({ success: false, description: 'Sys_Admin Authorization, lgo in with an User Account' });
                res.end();
            }
            //Prendo le vcs request pid
            var result = await this.#scrapper.getVCSRequestsPidByUserId(req.jwtAccountId);
            if(!result.success){
                res.status(500).json(result);
                res.end();
            }
            //Ritorno i risultati
            res.status(200).json(result.data);
            res.end();
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