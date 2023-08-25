const { Database } = require('./Database');
const { DataResponse } = require('./DataResponse.js');

class DatabaseStrategy extends Database{
    constructor() {
        super({
            user: 'admin',
            host: 'localhost',
            database: 'originissuer',
            password: 'admin',
            port: 5432,
        });
    }

    async insertAccount(email, hashed_pass, salt){
        if(!this.checkConnection())
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='INSERT INTO "accounts" ("email", "hashed_pass", "salt")VALUES ($1,$2,$3);';
            var values=[email,hashed_pass,salt];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,null,"Error insert account",null);
        }catch(e){
            return new DataResponse(false,null,"Error querry ainsert account",e);
        }
        return new DataResponse(true,null,"Account inserted succssfully",null);
    }

    async getAccountByEmail(email){
        if(!this.checkConnection())
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "accounts" WHERE "email"=$1';
            var values=[email];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Error Getting Account",null);
            if(result.rows.length != 1)
                return new DataResponse(false,null,"Account Does Not existt",null);
            var account=result.rows[0];
        }catch(e){
            return new DataResponse(false,null,"Error making querry",e);
        }
        return new DataResponse(true,account,"account successfully get",null);
    }

    async getAccountById(id){
        if(!this.checkConnection())
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "accounts" WHERE "id"=$1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Error Getting Account",null);
            if(result.rows.length != 1)
                return new DataResponse(false,null,"Account Does Not existt",null);
            var account=result.rows[0];
        }catch(e){
            return new DataResponse(false,null,"Error making querry",e);
        }
        return new DataResponse(true,account,"account successfully get",null);
    }

    async insertSys_admin(accountId,role){
        if(!this.checkConnection())
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='INSERT INTO "sys_admins" ("account", "role") VALUES ($1,$2);';
            var values=[accountId,role];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,null,"Errore into sys_admin data insert",null)
        }catch(e){
            return new DataResponse(false,null,"Error Querry insert sys_admin",e);
        }
        return new DataResponse(true,null,"Sys_admin inserted successfully",null);
    }

    async getSys_adminById(id){
        if(!this.checkConnection())
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "sys_admins" WHERE "id"=$1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Error retrieve Sys Admin",null);
            if(result.rows.length != 1)
                return new DataResponse(false,null,"Sys Admin not found",null);
            var sys_admin=result.rows[0];
        }catch(e){
            return new DataResponse(false,null,"Error querry get sysadmin",e);
        }
        return new DataResponse(true,sys_admin,"Sys admin get successffully",null);
    }

    async insertUser(accountId){
        if(!this.checkConnection())
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='INSERT INTO "users" ("account", "created_at") VALUES ($1, now());';
            var values=[accountId];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,null,"Error insert user",null);
        }catch(e){
            return new DataResponse(false,null,"Error querry insert user",e);
        }
        return new DataResponse(true,null,"User Iserted successfully",null);
    }

    async getUserById(id){
        if(!this.checkConnection())
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "users" WHERE "id"=$1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Error Getting user",null);
            if(result.rows.length != 1)
                return new DataResponse(false,null,"User not found",null);
            var user=result.rows[0];
        }catch(e){
            return new DataResponse(false,null,"Error querry get user",e);
        }
        return new DataResponse(true,user,"User getted successfully",null);
    }

    async getVCSRequestsMarByUserId(id){
        if(!this.checkConnection())
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "vcs_requests" JOIN "vcs_content_marital_status" ON id=vcs_content_marital_status.vcs_request WHERE "applicant"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Error User's vcs requests married status",null);
            var vcs_requests=result;
        }catch(e){
            return new DataResponse(false,null,"Error Querry User's vcs requests married status",e);
        }
        return new DataResponse(true,vcs_requests,"User's vcs requests married status getted successfully",null);
    }

    async getVCSRequestsPidByUserId(id){
        if(!this.checkConnection())
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "vcs_requests" JOIN "vcs_content_pid" ON id=vcs_content_pid.vcs_request WHERE "applicant"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Error User's vcs requests married status",null);
            var vcs_requests=result;
        }catch(e){
            return new DataResponse(false,null,"Error Querry User's vcs requests married status",e);
        }
        return new DataResponse(true,vcs_requests,"User's vcs requests married status getted successfully",null);
    }

    async getVCSRequestVerification(id){
        if(!this.checkConnection())
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "vcs_requests" JOIN "vcs_requests_verifications" ON id=vcs_requests_verifications.vcs_request WHERE "id"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Err",null);
            if(result.rows.length != 1)
                return new DataResponse(true,{pending:true},"",null);

            var verification=result.rows[0];
            return new DataResponse(true,verification,"",null);
        }catch(e){
            return new DataResponse(false,null,"",e);
        }
    }
}

//Export for public uses
module.exports = {
    DatabaseStrategy:DatabaseStrategy
}
