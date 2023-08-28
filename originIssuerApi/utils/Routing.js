const { Authentication } = require('./authentication/Authentication.js')
const { DatabaseStrategy } = require('./dataScrapper/DatabaseStrategy.js');
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

    async configEndpoint(){
        //Auth Login
        this.#app.post('/auth/login', async (req, res) => {
            const { email, password } = req.body;
            //Verifica dati input
            // Verifica dati di input (presenza ed esistenza)
            if (!email || email.trim() === '') {
                res.status(500).json({ success: false, message: 'Email Login Missing' });
                res.end();return;
            }
            if( !password || password.trim() === ''){
                res.status(500).json({ success: false, message: 'Password Login Missing' });
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
                res.status(500).json({ success: false, message: 'Email Register Missing' });
                res.end();return;
            }
            if( !password || password.trim() === ''){
                res.status(500).json({ success: false, message: 'Password Register Missing' });
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

        //Get VCS Requests verification stuatus
        this.#app.get(['/vcsrequest/status/:id','/vcsrequest/status/'],this.#auth.decodeToken, async (req, res) => {
            //Verifico che Non sia un Sys_admin
            if(req.jwtSysAdmin){
                res.status(500).json({ success: false, description: 'Sys_Admin Authorization, lgo in with an User Account' });
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

    }

    get app() {
        return this.#app;
    }
    
}

//Export for public uses
module.exports = {
    Routing:Routing
}