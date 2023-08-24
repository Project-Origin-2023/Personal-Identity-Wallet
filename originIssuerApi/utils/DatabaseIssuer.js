const { Database } = require('./Database');

class DatabaseIssuer extends Database{
    constructor(config) {
        super(config);
    }

    
}

//Export for public uses
module.exports = {
    DatabaseIssuer:DatabaseIssuer
}
