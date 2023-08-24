const { Client } = require('../node_modules/pg');

class Database {
    #client;
    #connected;

    constructor(config) {
        try{
            this.#dbConnect(config);
        }catch(e){console.log(e);}
    }

    destructor() {
        this.#dbDisconnect();
    }

    async #dbConnect(config){
        //Client creation of Postgresql DBMS
        this.#client = new Client({
            user: config.user,
            host: config.host,
            database: config.database,
            password: config.password,
            port: config.port
        });
        //Client Connection
        this.#client.connect().catch((e) =>{
            this.#connected = false; 
        });
        this.#connected = true; 
    }

    checkConnection(){
        return this.#connected;
    }

    getClient(){
        return this.#client;
    }

    async #dbDisconnect(){
        await this.#client.end();
    }

    async query(query,values) {
        return await this.#client.query(query, values);
    }

}

//Export for public uses
module.exports = {
    Database:Database
}