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
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='INSERT INTO "accounts" ("email", "hashed_pass", "salt") VALUES ($1,$2,$3);';
            var values=[email,hashed_pass,salt];
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
            return new DataResponse(false,"Error in PG DB Connection");

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
            return new DataResponse(false,"Error in PG DB Connection");

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

    async insertSys_admin(accountId,role){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='INSERT INTO "sys_admins" ("account", "role") VALUES ($1,$2);';
            var values=[accountId,role];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,"Sys_admin data insertion failed")
        }catch(e){
            return new DataResponse(false,"Sys_admin account insertion failed",null,e);
        }
        return new DataResponse(true,"Sys_admin inserted successfully");
    }

    async insertSys_adminAccount(email, hashed_pass, salt,role){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='INSERT INTO "accounts" ("email", "hashed_pass", "salt") VALUES ($1,$2,$3);';
            var values=[email,hashed_pass,salt];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,"Account insertion failed");
            values=[role];
            query='INSERT INTO "sys_admins" ("account", "role") VALUES (currval(\'accounts_id_seq\'),$1);';
            result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,"Sys_admin data insertion failed")
        }catch(e){
            return new DataResponse(false,"Sys_admin account insertion failed",null,e);
        }
        return new DataResponse(true,"Sys_admin Account inserted successfully");
    }

    async getSys_adminById(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='SELECT * FROM "sys_admins" WHERE "account"=$1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false," Sys Admin retrieval error");
            if(result.rows.length != 1)
                return new DataResponse(false,"Sys Admin not found");
            var sys_admin=result.rows[0];
        }catch(e){
            return new DataResponse(false,"Error retrieving sysadmin",null,e);
        }
        return new DataResponse(true,"Sys admin successfully retrieved",{sys_admin:sys_admin});
    }

    async insertUser(accountId){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='INSERT INTO "users" ("account", "created_at") VALUES ($1, now());';
            var values=[accountId];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,"User data insertion failed");
        }catch(e){
            return new DataResponse(false,"User insertion failed",null,e);
        }
        return new DataResponse(true,"User inserted successfully");
    }

    async insertUserAccount(email, hashed_pass, salt){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='INSERT INTO "accounts" ("email", "hashed_pass", "salt") VALUES ($1,$2,$3);';
            var values=[email,hashed_pass,salt];
            var result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,"Account insertion failed");
            values=[];
            query='INSERT INTO "users" ("account", "created_at") VALUES (currval(\'accounts_id_seq\'), now());';
            result=await this.query(query, values);
            if(!result)
                 return new DataResponse(false,"User account data insertion failed")
        }catch(e){
            return new DataResponse(false,"User account insertion failed",null,e);
        }
        return new DataResponse(true,"User Account inserted successfully");
    }

    async getUserById(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='SELECT * FROM "users" WHERE "id"=$1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Error Getting user");
            if(result.rows.length != 1)
                return new DataResponse(false,"User not found");
            var user=result.rows[0];
        }catch(e){
            return new DataResponse(false,"Error retrieving sysadmin",null,e);
        }
        return new DataResponse(true,"User retrieved successfully",{user:user});
    }

    async getVCSRequestById(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='SELECT * FROM "vcs_requests" WHERE "id"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Vcs requests error");
            if(result.rows.length != 1)
                return new DataResponse(false,"Vcs request not found");
            var vcs_request=result.rows[0];
        }catch(e){
            return new DataResponse(false,"vcs requests query error ",null,e);
        }
        return new DataResponse(true,"vcs requests successfully retrieved",{vcs_request:vcs_request});
    }

    async getVCSRequestsMarByUserId(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='SELECT * FROM "vcs_requests" JOIN "vcs_content_marital_status" ON id=vcs_content_marital_status.vcs_request WHERE "applicant"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"User's vcs requests married status error");
            var vcs_requests=result.rows;
        }catch(e){
            return new DataResponse(false,"User's vcs requests married status query error",null,e);
        }
        return new DataResponse(true,"User's vcs requests married status successfully retrieved",{vcs_requests:vcs_requests});
    }

    async getVCSRequestMarById(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='SELECT * FROM "vcs_requests" JOIN "vcs_content_marital_status" ON id=vcs_content_marital_status.vcs_request WHERE "id"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Vcs request married status error");
            if(result.rows.length != 1)
                return new DataResponse(false,"Vcs request Marital not found");
            var vcs_request=result.rows[0];
        }catch(e){
            return new DataResponse(false,"User's vcs request married status query error",null,e);
        }
        return new DataResponse(true," vcs request married status successfully retrieved",{vcs_request:vcs_request});
    }

    async insertVCSRequestMar(applicantId,status,personalIdentifier){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='INSERT INTO "vcs_requests" ("applicant") VALUES ($1);';
            var values=[applicantId];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Error insert vcs_request");
            values=[status,personalIdentifier];
            query='INSERT INTO "vcs_content_marital_status" ("vcs_request", "status", "personalIdentifier") VALUES (currval(\'vcs_requests_id_seq\'),$1,$2)';
            result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Errore into vcs request marital_status data insert")
        }catch(e){
            return new DataResponse(false,"Vcs request marital_status insertion failed",null,e);
        }
        return new DataResponse(true,"vcs request marital_status inserted successfully");
    }

    async getVCSRequestsPidByUserId(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='SELECT * FROM "vcs_requests" JOIN "vcs_content_pid" ON id=vcs_content_pid.vcs_request WHERE "applicant"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"User's vcs requests PID status error");
            var vcs_requests=result.rows;
        }catch(e){
            return new DataResponse(false,"User's vcs requests PID status query error",null,e);
        }
        return new DataResponse(true,"User's vcs requests PID successfully retrieved",{vcs_requests:vcs_requests});
    }

    async getVCSRequestPidById(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='SELECT * FROM "vcs_requests" JOIN "vcs_content_pid" ON id=vcs_content_pid.vcs_request WHERE "id"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"vcs request PID status Error");
            if(result.rows.length != 1)
                return new DataResponse(false,"Vcs request PID not found");
            var vcs_request=result.rows[0];
        }catch(e){
            return new DataResponse(false,"Vcs request PID status query error",null,e);
        }
        return new DataResponse(true,"Vcs request PID successfully retrieved",{vcs_request:vcs_request});
    }

    async insertVCSRequestPid(applicantId,currentAddress,dateOfBirth,familyName,firstName,gender,nameAndFamilyNameAtBirth,personalIdentifier,placeOfBirth){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='INSERT INTO "vcs_requests" ("applicant") VALUES ($1);';
            var values=[applicantId];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Error insert vcs_request");
            values=[currentAddress,dateOfBirth,familyName,firstName,gender,nameAndFamilyNameAtBirth,personalIdentifier,placeOfBirth];
            query='INSERT INTO "vcs_content_pid" ("vcs_request", "currentAddress", "dateOfBirth", "familyName", "firstName", "gender", "nameAndFamilyNameAtBirth", "personalIdentifier", "placeOfBirth") VALUES (currval(\'vcs_requests_id_seq\'),$1,$2,$3,$4,$5,$6,$7,$8)';
            result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Vcs request pid data insertion error")
        }catch(e){
            return new DataResponse(false,"Vcs request pid insertion failed",e);
        }
        return new DataResponse(true,"vcs request pid inserted successfully");
    }

    async getVCSRequestVerification(id){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            //Veirifico esistenza vcs request id
            var result = await this.getVCSRequestById(id);
            if(!result.success)
                return result;
            //query get verification
            var query='SELECT id,released,status,applicant FROM "vcs_requests" JOIN "vcs_requests_verifications" ON id=vcs_requests_verifications.vcs_request WHERE "id"= $1';
            var values=[id];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Vcs verification retrieval error");
            if(result.rows.length != 1)
                return new DataResponse(true,"Verification in pending",{verification:{id:id,pending:true}});

            var verification=result.rows[0];
            verification.pending = false;
            return new DataResponse(true,"Vcs request verification successfully retrieved",{verification:verification});
        }catch(e){
            return new DataResponse(false,"Error getting vcs request verification",null,e);
        }
    }

    async updateVCSRequestReleased(vcs_requestId,released){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='UPDATE "vcs_requests" SET "released" = $2 WHERE "id" = $1';
            var values=[vcs_requestId,released];
            var result= await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Update vcs_request released error");
        }catch(e){
            return new DataResponse(false,"update released vcs request query error",null,e);
        }
        return new DataResponse(true,"vcs request released successfully updated");
    }

    async updateVCSRequestVerificationStatus(vcs_requestId,status){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='UPDATE "vcs_requests_verifications" SET "status" = $2 WHERE "vcs_request" = $1';
            var values=[vcs_requestId,status];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Update vcs_request verification status error");
        }catch(e){
            return new DataResponse(false,"Update status vcs request verification query error",null,e);
        }
        return new DataResponse(true,"Vcs request verification status successfully updated");
    }

    async getVCSRequestsPending(){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            //query get verification
            var query='SELECT id,applicant,released FROM "vcs_requests" EXCEPT SELECT id,applicant,released FROM "vcs_requests" JOIN "vcs_requests_verifications" ON id=vcs_requests_verifications.vcs_request';
            var values=[];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Vcs request in pending retrieval error");

            return new DataResponse(true,"Vcs request in pending successfully retrieved",{vcs_requests_pending:result.rows});
        }catch(e){
            return new DataResponse(false,"Error getting vcs request in pending",null,e);
        }
    }

    async getVCSRequestsNotPending(){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            //query get verification
            var query='SELECT id,applicant,released FROM "vcs_requests" JOIN "vcs_requests_verifications" ON id=vcs_requests_verifications.vcs_request';
            var values=[];
            var result=await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Vcs request in pending retrieval error");

            return new DataResponse(true,"Vcs request in pendintsuccessfully retrieved",{vcs_requests_notpending:result.rows});
        }catch(e){
            return new DataResponse(false,"Error getting vcs request in pending",null,e);
        }
    }

    async insertVCSRequestVerification(vcs_request,admin_verifier,status){
        var check = await this.checkConnection();
        if(!check)
            return new DataResponse(false,"Error in PG DB Connection");

        try{
            var query='INSERT INTO "vcs_requests_verifications" ("vcs_request", "admin_verifier", "status") VALUES ($1, $2, $3);';
            var values = [vcs_request,admin_verifier,status];
            var result = await this.query(query, values);
            if(!result)
                return new DataResponse(false,"Vcs request verification insertion error")
        }catch(e){
            return new DataResponse(false,"Vcs request verification insertion failed",e);
        }
        return new DataResponse(true,"vcs request verification inserted successfully");
    }







}

//Export for public uses
module.exports = {
    DatabaseStrategy:DatabaseStrategy
}
