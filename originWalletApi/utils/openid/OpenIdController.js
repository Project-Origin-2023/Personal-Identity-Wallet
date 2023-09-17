class OpenIdController {
    #axios;
    #walletUri;
    
    constructor(){
        
        this.#walletUri = 'http://openid.wallet.origin'
        this.#axios = require('axios');
    }

    async #makeRequest(config){
        try{
            var response = await this.#axios(config);
            return {success:true,description:"OIDC Request with success",data:response.data};
        }catch(e){
            if(typeof e.response.data !== 'undefined')
                return {success:false,description:e.response.data,data:null,error:e};
            else
                return {success:false,description:'General Open ID Connect Error, try Again',data:null,error:e};
        }
    }

    //Effettuo Richiesta OpenID per aggiornare token
    //Attualmente openid non fa la verifica sulla password durante il login, nel caso la facesse
    //questa parte di codice andrebbe modificata con un aggiornamento del token 
    // anche per waltid
    async refreshAuth(email,tokenOIDC){
        return this.login(email,'');
    }

    async login(id, password){
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.#walletUri+'/api/auth/login',
            headers: { 
                'accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            data : {id:id, password:password}
        };
        return await this.#makeRequest(config);
    }

    async getUserInfo(token){
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: this.#walletUri+'/api/auth/userInfo',
            headers: { 
                'accept': 'application/json', 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+token
            }
        };
        return await this.#makeRequest(config);
    }

    async getUserDid(token){
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: this.#walletUri+'/api/wallet/did/list',
            headers: { 
                'accept': 'application/json', 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+token
            }
        };
        return await this.#makeRequest(config);
    }

    async continueIssuing(did, sessionID, token){
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: this.#walletUri+'/api/wallet/issuance/continueIssuerInitiatedIssuance?did='+did+'&sessionId='+sessionID,
            headers: { 
              'Authorization': 'Bearer '+token
            }
          };
        return await this.#makeRequest(config);
    }

    async getCredentialList(token){
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: this.#walletUri+'/api/wallet/credentials/list',
            headers: { 
              'Authorization': 'Bearer '+token
            }
          };
        return await this.#makeRequest(config);
    }

    async getIssuanceInfo(sessionID,token){
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: this.#walletUri+'/api/wallet/issuance/info?sessionId='+sessionID,
            headers: { 
              'accept': 'application/json', 
              'Authorization': 'Bearer '+token
            }
          };
        return await this.#makeRequest(config);
    }

    async deleteCredential(id,token){
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: this.#walletUri+'/api/wallet/credentials/delete/'+id,
            headers: { 
              'accept': 'application/json', 
              'Authorization': 'Bearer '+token
            }
          };
        return await this.#makeRequest(config);
    }

    async continueIssuingXDevice(uri,token){
        let data = JSON.stringify({
            "oidcUri": uri
        });
        
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.#walletUri+'/api/wallet/issuance/startIssuerInitiatedIssuance',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+token
            },
            data : data
        };
        return await this.#makeRequest(config);
    }

    async startPresentation(uri, token){
        let data = JSON.stringify({
            "oidcUri": uri
        });
        
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.#walletUri+'/api/wallet/presentation/startPresentation',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+token
            },
            data : data
        };
        return await this.#makeRequest(config);
    }

    async continuePresentation(sessionID,did,token){
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: this.#walletUri+'/api/wallet/presentation/continue?sessionId='+sessionID+'&did='+did,
            headers: { 
                'Authorization': 'Bearer '+token
            }
        };
        return await this.#makeRequest(config);
    }

    async fulfillPresentation(claims,sessionID, token){
        let data = JSON.stringify(claims);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.#walletUri+'/api/wallet/presentation/fulfill?sessionId='+sessionID,
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer '+token
            },
            data : data
        };
        return await this.#makeRequest(config);
    }

   
}

//Export for public uses
module.exports = {
    OpenIdController:OpenIdController
}

