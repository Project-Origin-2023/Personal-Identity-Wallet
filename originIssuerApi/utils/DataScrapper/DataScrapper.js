//Pattern strategy implemented with docs:
//https://www.dofactory.com/javascript/design-patterns/strategy

class DataScrapper {
    #strategy;

    setStrategy(str){
        this.#strategy=str;
    }

    async insertAccount(email, hashed_pass, salt){
        return this.#strategy.insertAccount(email, hashed_pass, salt);
    }

    async getAccountByEmail(email){
        return this.#strategy.getAccountByEmail(email);
    }

    async getAccountById(id){
        return this.#strategy.getAccountById(id);
    }

    async insertSys_admin(accountId,role){
        return this.#strategy.insertSys_admin(accountId,role);
    }

    async insertSys_adminAccount(email, hashed_pass, salt,role){
        return this.#strategy.insertSys_adminAccount(email, hashed_pass, salt,role);
    }

    async getSys_adminById(id){
        return this.#strategy.getSys_adminById(id);
    }

    async insertUser(accountId){
        return this.#strategy.insertUser(accountId);
    }

    async insertUserAccount(email, hashed_pass, salt){
        return this.#strategy.insertUserAccount(email, hashed_pass, salt);
    }

    async getUserById(id){
        return this.#strategy.getUserById(id);
    }

    async getVCSRequestById(id){
        return this.#strategy.getVCSRequestById(id);
    }

    async getVCSRequestsMarByUserId(id){
        return this.#strategy.getVCSRequestsMarByUserId(id);
    }

    async getVCSRequestMarById(id){
        return this.#strategy.getVCSRequestMarById(id);
    }

    async insertVCSRequestMar(applicantId,status,personalIdentifier){
        return this.#strategy.insertVCSRequestMar(applicantId,status,personalIdentifier);
    }
    
    async getVCSRequestsPidByUserId(id){
        return this.#strategy.getVCSRequestsPidByUserId(id);
    }

    async getVCSRequestPidById(id){
        return this.#strategy.getVCSRequestPidById(id);
    }

    async insertVCSRequestPid(applicantId,currentAddress,dateOfBirth,familyName,firstName,gender,nameAndFamilyNameAtBirth,personalIdentifier,placeOfBirth){
        return this.#strategy.insertVCSRequestPid(applicantId,currentAddress,dateOfBirth,familyName,firstName,gender,nameAndFamilyNameAtBirth,personalIdentifier,placeOfBirth);
    }
    
    async getVCSRequestVerification(id){
        return this.#strategy.getVCSRequestVerification(id);
    }

    async updateVCSRequestReleased(vcs_requestId,released){
        return this.#strategy.updateVCSRequestReleased(vcs_requestId,released);
    }

    async updateVCSRequestVerificationStatus(vcs_requestId,status){
        return this.#strategy.updateVCSRequestVerificationStatus(vcs_requestId,status);
    }

    async getVCSRequestsPending(){
        return this.#strategy.getVCSRequestsPending();
    }

    async getVCSRequestsNotPending(){
        return this.#strategy.getVCSRequestsNotPending();
    }

    async insertVCSRequestVerification(vcs_request,admin_verifier,status){
        return this.#strategy.insertVCSRequestVerification(vcs_request,admin_verifier,status);
    }


    

}

//Export for public uses
module.exports = {
    DataScrapper:DataScrapper
}