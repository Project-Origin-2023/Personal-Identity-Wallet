const { Database } = require('./Database');

class DatabaseStrategy extends Database{
    constructor() {
        super({
            user: 'admin',
            host: '10.5.0.31',
            database: 'originissuer',
            password: 'admin',
            port: 5432,
        });
    }

    async login(email, password){
        if(!this.checkConnection())
            return {status:"error", error:e, description:"Error in PG DB Connection"}

        try{
            query='SELECT id FROM "users" WHERE email=$1';
            values=[email,password];
            result=await this.getClient.query(query, values);
            userId=result.rows[0].id;
        }catch(e){
            return {status:"error", error:e, description:"login error"}
        }
        return {status:"success", data:userId, description:"login successfully"}
    }

    async register(email, password){
        if(!this.checkConnection())
            return {status:"error", error:e, description:"Error in PG DB Connection"}

        try{
            query='SELECT id FROM "users" WHERE email=$1';
            values=[email,password];
            result=await this.getClient.query(query, values);
            userId=result.rows[0].id;
        }catch(e){
            return {status:"error", error:e, description:"registration error"}
        }
        return {status:"success", data:userId, description:"registration successfully"}
    }
}

//Export for public uses
module.exports = {
    DatabaseStrategy:DatabaseStrategy
}
