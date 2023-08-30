const { Pool } = require('../../node_modules/pg');

class Database {
    #client;

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
        this.#client = new Pool({
            user: config.user,
            host: config.host,
            database: config.database,
            password: config.password,
            port: config.port
        })
    }

    async checkConnection(){
        try{
            var res = await this.#client.query("SELECT 1");
            if(!res)
                return false;
            return true;
        }catch(e){
            console.log("Error Connection DB");
        }
        return false;
    }

    async #dbDisconnect(){
        await this.#client.end();
    }

    async query(query, values) {
        return await this.#client.query(query, values);
    }

}

//Export for public uses
module.exports = {
    Database:Database
}