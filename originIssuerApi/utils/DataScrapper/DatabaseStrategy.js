const { Database } = require('./Database');
const { DataResponse } = require('../DataResponse.js');

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
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='INSERT INTO "accounts" ("email", "hashed_pass", "salt") VALUES ($1,$2,$3);';
            var values=[email,hashed_pass,salt];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,null,"Account insertion failed",null);
        }catch(e){
            return new DataResponse(false,null,"Error on query for account insertion",e);
        }
        return new DataResponse(true,null,"Account inserted successfully",null);
    }

    async getAccountByEmail(email){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "accounts" WHERE "email"=$1';
            var values=[email];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Error Getting Account",null);
            if(result.rows.length != 1)
                return new DataResponse(false,null,"Account Does Not exist",null);
            var account=result.rows[0];
        }catch(e){
            return new DataResponse(false,null,"Query error",e);
        }
        return new DataResponse(true,account,"Account successfully retrieved",null);
    }

    async getAccountById(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "accounts" WHERE "id"=$1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Error Getting Account",null);
            if(result.rows.length != 1)
                return new DataResponse(false,null,"Account Does Not exist",null);
            var account=result.rows[0];
        }catch(e){
            return new DataResponse(false,null,"Query error",e);
        }
        return new DataResponse(true,account,"Account successfully retrieved",null);
    }

    async insertSys_admin(accountId,role){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='INSERT INTO "sys_admins" ("account", "role") VALUES ($1,$2);';
            var values=[accountId,role];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,null,"Sys_admin data insertion failed",null)
        }catch(e){
            return new DataResponse(false,null,"Sys_admin account insertion failed",e);
        }
        return new DataResponse(true,null,"Sys_admin inserted successfully",null);
    }

    async insertSys_adminAccount(email, hashed_pass, salt,role){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='INSERT INTO "accounts" ("email", "hashed_pass", "salt") VALUES ($1,$2,$3);';
            var values=[email,hashed_pass,salt];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,null,"Account insertion failed",null);
            values=[role];
            query='INSERT INTO "sys_admins" ("account", "role") VALUES (currval(\'accounts_id_seq\'),$1);';
            result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,null,"Sys_admin data insertion failed",null)
        }catch(e){
            return new DataResponse(false,null,"Sys_admin account insertion failed",e);
        }
        return new DataResponse(true,null,"Sys_admin Account inserted successfully",null);
    }

    async getSys_adminById(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "sys_admins" WHERE "id"=$1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null," Sys Admin retrieval error",null);
            if(result.rows.length != 1)
                return new DataResponse(false,null,"Sys Admin not found",null);
            var sys_admin=result.rows[0];
        }catch(e){
            return new DataResponse(false,null,"Error retrieving sysadmin",e);
        }
        return new DataResponse(true,sys_admin,"Sys admin successfully retrieved",null);
    }

    async insertUser(accountId){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='INSERT INTO "users" ("account", "created_at") VALUES ($1, now());';
            var values=[accountId];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,null,"User data insertion failed",null);
        }catch(e){
            return new DataResponse(false,null,"User insertion failed",e);
        }
        return new DataResponse(true,null,"User inserted successfully",null);
    }

    async insertUserAccount(email, hashed_pass, salt){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='INSERT INTO "accounts" ("email", "hashed_pass", "salt") VALUES ($1,$2,$3);';
            var values=[email,hashed_pass,salt];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,null,"Account insertion failed",null);
            values=[];
            query='INSERT INTO "users" ("account", "created_at") VALUES (currval(\'accounts_id_seq\'), now());';
            result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,null,"User account data insertion failed",null)
        }catch(e){
            return new DataResponse(false,null,"User account insertion failed",e);
        }
        return new DataResponse(true,null,"User Account inserted successfully",null);
    }

    async getUserById(id){
        var check = await this.checkConnection();
        if(!check)
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
            return new DataResponse(false,null,"Error retrieving sysadmin",e);
        }
        return new DataResponse(true,user,"User retrieved successfully",null);
    }

    async getVCSRequestById(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "vcs_requests" WHERE "id"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Vcs requests error",null);
            if(result.rows.length != 1)
                return new DataResponse(false,null,"Vcs request not found",null);
            var vcs_request=result.rows[0];
        }catch(e){
            return new DataResponse(false,null,"vcs requests query error ",e);
        }
        return new DataResponse(true,vcs_request,"vcs requests successfully retrieved",null);
    }

    async getVCSRequestsMarByUserId(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "vcs_requests" JOIN "vcs_content_marital_status" ON id=vcs_content_marital_status.vcs_request WHERE "applicant"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"User's vcs requests married status error",null);
            var vcs_requests=result.rows;
        }catch(e){
            return new DataResponse(false,null,"User's vcs requests married status query error",e);
        }
        return new DataResponse(true,vcs_requests,"User's vcs requests married status successfully retrieved",null);
    }

    async getVCSRequestMarById(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "vcs_requests" JOIN "vcs_content_marital_status" ON id=vcs_content_marital_status.vcs_request WHERE "id"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Vcs request married status error",null);
            if(result.rows.length != 1)
                return new DataResponse(false,null,"Vcs request Marital not found",null);
            var vcs_request=result.rows;
        }catch(e){
            return new DataResponse(false,null,"User's vcs request married status query error",e);
        }
        return new DataResponse(true,vcs_request," vcs request married status successfully retrieved",null);
    }

    async insertVCSRequestMar(applicantId,status,personalIdentifier){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='INSERT INTO "vcs_requests" ("applicant") VALUES ($1);';
            var values=[applicantId];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Error insert vcs_request",null);
            values=[status,personalIdentifier];
            query='INSERT INTO "vcs_content_marital_status" ("vcs_request", "status", "personalIdentifier") VALUES (currval(\'vcs_requests_id_seq\'),$1,$2)';
            result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Errore into vcs request marital_status data insert",null)
        }catch(e){
            return new DataResponse(false,null,"Vcs request marital_status insertion failed",e);
        }
        return new DataResponse(true,null,"vcs request marital_status inserted successfully",null);
    }

    async getVCSRequestsPidByUserId(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "vcs_requests" JOIN "vcs_content_pid" ON id=vcs_content_pid.vcs_request WHERE "applicant"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"User's vcs requests PID status error",null);
            var vcs_requests=result.rows;
        }catch(e){
            return new DataResponse(false,null,"User's vcs requests PID status query error",e);
        }
        return new DataResponse(true,vcs_requests,"User's vcs requests PID successfully retrieved",null);
    }

    async getVCSRequestPidById(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='SELECT * FROM "vcs_requests" JOIN "vcs_content_pid" ON id=vcs_content_pid.vcs_request WHERE "id"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"vcs request PID status Error",null);
            if(result.rows.length != 1)
                return new DataResponse(false,null,"Vcs request PID not found",null);
            var vcs_request=result.rows[0];
        }catch(e){
            return new DataResponse(false,null,"Vcs request PID status query error",e);
        }
        return new DataResponse(true,vcs_request,"Vcs request PID successfully retrieved",null);
    }

    async insertVCSRequestPid(applicantId,currentAddress,dateOfBirth,familyName,firstName,gender,nameAndFamilyNameAtBirth,personalIdentifier){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='INSERT INTO "vcs_requests" ("applicant") VALUES ($1);';
            var values=[applicantId];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Error insert vcs_request",null);
            values=[currentAddress,dateOfBirth,familyName,firstName,gender,nameAndFamilyNameAtBirth,personalIdentifier];
            query='INSERT INTO "vcs_content_pid" ("vcs_request", "currentAddress", "dateOfBirth", "familyName", "firstName", "gender", "nameAndFamilyNameAtBirth", "personalIdentifier") VALUES (currval(\'vcs_requests_id_seq\'),$1,$2,$3,$4,$5,$6,$7)';
            result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Vcs request pid data insertion error",null)
        }catch(e){
            return new DataResponse(false,null,"Vcs request pid insertion failed",e);
        }
        return new DataResponse(true,null,"vcs request pid inserted successfully",null);
    }

    async getVCSRequestVerification(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            //Veirifico esistenza vcs request id
            var result = await this.getVCSRequestById(id);
            if(!result.success)
                return result;
            //query get verification
            var query='SELECT id,released,status FROM "vcs_requests" JOIN "vcs_requests_verifications" ON id=vcs_requests_verifications.vcs_request WHERE "id"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Vcs verification retrieval error",null);
            if(result.rows.length != 1)
                return new DataResponse(true,{id:id,pending:true},"Verification successfully retrieved",null);

            var verification=result.rows[0];
            verification.pending = false;
            return new DataResponse(true,verification,"Vcs request verification successfully retrieved",null);
        }catch(e){
            return new DataResponse(false,null,"",e);
        }
    }

    async updateVCSRequestReleased(vcs_requestId,released){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='UPDATE "vcs_requests" SET "released" = $2 WHERE "id" = $1';
            var values=[vcs_requestId,released];
            var result= await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Update vcs_request released error",null);
        }catch(e){
            return new DataResponse(false,null,"update released vcs request query error",e);
        }
        return new DataResponse(true,null,"vcs request released successfully updated",null);
    }

    async updateVCSRequestVerificationStatus(vcs_requestId,status){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,null,"Error in PG DB Connection",null);

        try{
            var query='UPDATE "vcs_requests_verifications" SET "status" = $2 WHERE "vcs_request" = $1';
            var values=[vcs_requestId,status];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,null,"Update vcs_request verification status error",null);
        }catch(e){
            return new DataResponse(false,null,"Update status vcs request verification query error",e);
        }
        return new DataResponse(true,null,"Vcs request verification status successfully updated",null);
    }







}

//Export for public uses
module.exports = {
    DatabaseStrategy:DatabaseStrategy
}
