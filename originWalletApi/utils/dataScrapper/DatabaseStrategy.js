const { Database } = require('./Database');
const { DataResponse } = require('../DataResponse.js');

class DatabaseStrategy extends Database{
    constructor() {
        super({
            user: process.env.DBUSER,
            host: process.env.DBHOST,
            database: process.env.DBDATABASE,
            password: process.env.DBPASSWORD,
            port: process.env.DBPORT,
        });
    }

    async insertAccount(email, did, hashed_pass, salt){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in Database Connection");

        try{
            var query='INSERT INTO "accounts" ("email", "did","hashed_pass", "salt") VALUES ($1,$2,$3,$4);';
            var values=[email,did,hashed_pass,salt];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,"Account insertion failed");
        }catch(e){
            return new DataResponse(false,"Error on query for account insertion",null,e);
        }
        return new DataResponse(true,"Account inserted successfully");
    }

    async getAccountByEmail(email){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in Database Connection");

        try{
            var query='SELECT * FROM "accounts" WHERE "email"=$1';
            var values=[email];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Error Getting Account");
            if(result.rows.length != 1)
                return new DataResponse(false,"Account Does Not exist");
            var account=result.rows[0];
        }catch(e){
            return new DataResponse(false,"Query error",e);
        }
        return new DataResponse(true,"Account successfully retrieved",{account:account});
    }

    async getAccountById(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in Database Connection");

        try{
            var query='SELECT * FROM "accounts" WHERE "id"=$1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Error Getting Account");
            if(result.rows.length != 1)
                return new DataResponse(false,"Account Does Not exist");
            var account=result.rows[0];
        }catch(e){
            return new DataResponse(false,"Query error",null,e);
        }
        return new DataResponse(true,"Account successfully retrieved",account);
    }
}

//Export for public uses
module.exports = {
    DatabaseStrategy:DatabaseStrategy
}
