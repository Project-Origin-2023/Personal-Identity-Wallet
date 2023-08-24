const { Client } = require('../node_modules/pg');

class Database {
    #client;
    #connected;

    constructor(config) {
        this.#dbConnect(config);
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
        this.#client.connect().then(() => {this.#connected = true;})
        .catch((err) => {this.#connected = false; throw new Error('Error in PG DB Connection"');});
    }

    checkConnection(){
        return this.#connected;
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