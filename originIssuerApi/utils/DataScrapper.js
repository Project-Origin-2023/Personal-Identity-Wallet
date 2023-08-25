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

    async getSys_adminById(id){
        return this.#strategy.getSys_adminById(id);
    }

    async insertUser(accountId){
        return this.#strategy.insertUser(accountId);
    }

    async getUserById(id){
        return this.#strategy.getUserById(id);
    }



    

}

//Export for public uses
module.exports = {
    DataScrapper:DataScrapper
}