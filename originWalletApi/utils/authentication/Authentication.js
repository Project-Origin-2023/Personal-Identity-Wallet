const { DataResponse } = require('../DataResponse.js');
const { DatabaseStrategy } = require('../dataScrapper/DatabaseStrategy.js');
const { DataScrapper } = require('../dataScrapper/DataScrapper.js')

class Authentication {
    #jwt = require("jsonwebtoken");
    #jwtKey;
    #jwtExpirySeconds;
    #crypto = require('crypto');
    #scrapper;

    constructor(secret,expireSecond){
        this.#jwtKey = secret;
        this.#jwtExpirySeconds = expireSecond;
        this.#scrapper = new DataScrapper();
        try{
            this.#scrapper.setStrategy(new DatabaseStrategy());
        }catch(e){
            console.log("Error in Database Connection, reload and try again")
        }
    }

    decodeToken = (req, res, next) => {
        let token = req.headers["x-access-token"];
        if (!token)
            res.status(403).send(new DataResponse(false,"Auth Token Not found, be sure to be logged in"));
      
        this.#jwt.verify(token, this.#jwtKey, (err, decoded) => {
            if (err)
                res.status(401).send(new DataResponse(false,"Authorization token not valid"));
            req.jwtAccountId = decoded.id;
            req.jwtAccountEmail = decoded.email;
            req.jwtAccountDid = decoded.did;
            req.jwtTokenOIDC = decoded.tokenOIDC;
            next();
        });
    };

    #createToken(id,email,did,tokenOIDC){
        const token = this.#jwt.sign({id,email,did,tokenOIDC}, this.#jwtKey, {
            algorithm: "HS256",
            expiresIn: this.#jwtExpirySeconds,
        })
        return token;
    }

    async refreshAuth(email, tokenOIDC){
        //Get account info from DataScrapper
        var result = await this.#scrapper.getAccountByEmail(email);
        if (!result.success)
            return result;
        //save account
        var account = result.data.account;
        //Create token
        let token = this.#createToken(account.id,account.email,account.did,tokenOIDC);
        //return cookie with access token and isAdmin Permission
        return new DataResponse(true,"Authorization Token successfully refreshed",{token:token});
    }

    async login(email,password, tokenOIDC){
        //Get account info from DataScrapper
        var result = await this.#scrapper.getAccountByEmail(email);
        if (!result.success)
            return result;
        //save account
        var account = result.data.account;
        //Compare Hash passwords
        var TrueHash = account.hashed_pass;
        var CalculatedHash = this.#crypto.pbkdf2Sync(password, account.salt,500, 64, `sha512`).toString(`hex`);
        if(TrueHash != CalculatedHash)
            return new DataResponse(false,"Password is not correct");
        //Create token
        let token = this.#createToken(account.id,account.email,account.did,tokenOIDC);
        //return cookie with access token and isAdmin Permission
        return new DataResponse(true,"Login Authorization Completed, you are welcome",{token:token});
    }

    async register(email,password,did,tokenOIDC){
        //Register User Account
        var salt = this.#crypto.randomBytes(16).toString('hex');
        var hashed_pass = this.#crypto.pbkdf2Sync(password, salt,500, 64, `sha512`).toString(`hex`);
        var result = await this.#scrapper.insertAccount(email, did, hashed_pass, salt);
        if (!result.success)
            return result;
        
        //Login User 
        result = await this.login(email,password,tokenOIDC);
        if(!result.success)
            return result;
        //ritorno il token
        var token = result.data.token;
        return new DataResponse(true,"Registration Authorization Completed, you are welcome",{token:token});
    }
}

//Export for public uses
module.exports = {
    Authentication:Authentication
}