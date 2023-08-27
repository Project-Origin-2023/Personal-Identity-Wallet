const { Authentication } = require('./authentication/Authentication.js')

class Routing{
    #cors = require('cors');
    #express = require('express');
    #bodyParser = require('body-parser');
    #app;
    #corsOptions = {
        origin: 'http://localhost:19001',
    };
    #auth;
    constructor(){
        this.#app = this.#express();
        this.#app.use(this.#bodyParser.json());
        this.#app.use(this.#cors(this.#corsOptions));
        this.#auth = new Authentication("Secret",3000);
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
            //TODO
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
            //TODO
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
    }
    
}

//Export for public uses
module.exports = {
    Routing:Routing
}