//Pattern strategy implemented with docs:
//https://www.dofactory.com/javascript/design-patterns/strategy

class DataScrapper {
    #strategy;

    setStrategy(str){
        this.#strategy=str;
    }

    async insertAccount(email, did, hashed_pass, salt){
        return this.#strategy.insertAccount(email, did, hashed_pass, salt);
    }

    async getAccountByEmail(email){
        return this.#strategy.getAccountByEmail(email);
    }

    async getAccountById(id){
        return this.#strategy.getAccountById(id);
    }
}

//Export for public uses
module.exports = {
    DataScrapper:DataScrapper
}