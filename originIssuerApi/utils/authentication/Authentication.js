const { DataResponse } = require('../DataResponse.js');
const { DatabaseStrategy } = require('../dataScrapper/DatabaseStrategy.js')
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
            console.log("Error DB Connection")
        }
    }

    decodeToken = (req, res, next) => {
        let token = req.headers["x-access-token"];
        if (!token)
            res.status(403).send(new DataResponse(false,null,"Authorization token not found",null));
      
        this.#jwt.verify(token, this.#jwtKey, (err, decoded) => {
            if (err)
                res.status(401).send(new DataResponse(false,null,"Unauthorized",null));
            req.jwtAccountId = decoded.accountId;
            req.jwtAccountEmail = decoded.email;
            req.jwtSysAdmin = decoded.sysAdmin;
            if(req.jwtSysAdmin)
                req.jwtRole = decoded.role;
            next();
        });
    };

    #createToken(accountId,email,sysAdmin,role){
        const token = this.#jwt.sign({accountId,email,sysAdmin,role}, this.#jwtKey, {
            algorithm: "HS256",
            expiresIn: this.#jwtExpirySeconds,
        })
        return token;
    }

    addTokenCookie(res,token){
        res.cookie("token", token, { maxAge: this.#jwtExpirySeconds * 1000 })
    }

    async login(email,password){
        //Get account info from DataScrapper
        var result = await this.#scrapper.getAccountByEmail(email);
        if (!result.success)
            return result;
        //save account
        var account = result.data;
        //Compare Hash passwords
        var TrueHash = account.hashed_pass;
        var CalculatedHash = this.#crypto.pbkdf2Sync(password, account.salt,500, 64, `sha512`).toString(`hex`);
        if(TrueHash != CalculatedHash)
            return new DataResponse(false,null,"Password is not correct",null);
        //Verify SysAdmin Permision and create token
        result = this.#scrapper.getSys_adminById(account.id);
        var token;
        if (!result.success)
            token = this.#createToken(account.id,account.email,false,null);
        else
            token = this.#createToken(account.id,account.email,true,account.role);
        //return cookie with access token
        return new DataResponse(true,token,"Auth Login Successfuly Token created",null);
    }

    async register(email,password){
        //Register User Account
        var salt = this.#crypto.randomBytes(16).toString('hex');
        var hashed_pass = this.#crypto.pbkdf2Sync(password, salt,500, 64, `sha512`).toString(`hex`);
        var result = await this.#scrapper.insertUserAccount(email, hashed_pass, salt);
        if (!result.success)
            return result;
        
        //Login User 
        result = await this.login(email,password);
        if(!result.success)
            return result;
        //ritorno il token
        var token = result.data;
        return new DataResponse(true,token,"Auth Login Successfuly Token created",null);
    }
}

//Export for public uses
module.exports = {
    Authentication:Authentication
}