//Pattern strategy implemented with docs:
//https://www.dofactory.com/javascript/design-patterns/strategy

class DataScrapper {
    #strategy;

    setStrategy(str){
        this.#strategy=str;
    }

    async login(email, password){
        return this.#strategy.login(email, password)
    }

    async register(email, password){
        return this.#strategy.register(email, password)
    }

}

//Export for public uses
module.exports = {
    DataScrapper:DataScrapper
}