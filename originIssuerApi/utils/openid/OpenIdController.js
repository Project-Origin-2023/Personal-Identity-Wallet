class OpenIdController {
    #axios;
    #issuerUri;
    #crypto = require('crypto');
    
    constructor(){
        
        this.#issuerUri = 'http://openid.issuer.origin'
        this.#axios = require('axios');
    }

    async #makeRequest(config){
        try{
            var response = await this.#axios(config);
            return {success:true,description:"OIDC Request with success",data:response.data};
        }catch(e){
            return {success:false,description:"OIDC Error",data:null,error:e};
        }
    }

    postTemplate(name,data){
        //TODO da togliere e ricevere come parametro
        data = JSON.stringify({
        "type": [
            "PID"
        ],
        "@context": [
            "https://www.w3.org/2018/credentials/v1"
        ],
        "issuer": "",
        "issuanceDate": "",
        "issued": "",
        "validFrom": "",
        "credentialSchema": {
            "id": "https://raw.githubusercontent.com/walt-id/waltid-ssikit-vclib/master/src/test/resources/schemas/VerifiableId.json",
            "type": "FullJsonSchemaValidator2021"
        },
        "credentialSubject": {
            "currentAddress": [],
            "dateOfBirth": "",
            "familyName": "",
            "firstName": "",
            "gender": "",
            "identifier": [],
            "nameAndFamilyNameAtBirth": "",
            "personalIdentifier": "",
            "placeOfBirth": ""
        },
        "credentialStatus": {
            "id": "",
            "type": ""
        },
        "evidence": [
            {
            "documentPresence": [],
            "evidenceDocument": [],
            "id": "",
            "subjectPresence": [],
            "type": [],
            "verifier": ""
            }
        ]
        });

        var config = {
        method: 'post',
        url: this.#issuerUri+'/issuer-api/default/config/templates/'+name,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        return this.#makeRequest(config);
    }

    async getTemplates(){
        var config = {
        method: 'get',
        url: this.#issuerUri+'/issuer-api/default/config/templates',
        headers: { }
        };

        return await this.#makeRequest(config);
    }

    async getTemplate(name){
        var config = {
        method: 'get',
        url: this.#issuerUri+'/issuer-api/default/config/templates/'+name,
        headers: { }
        };

        return await this.#makeRequest(config);
    }

    async issueCredentialSameDevice(wallet,data){
        var config = {
            method: 'post',
            url: this.#issuerUri+'/issuer-api/default/credentials/issuance/request?isPreAuthorized=true&walletId='+wallet,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
        return await this.#makeRequest(config);
    }

    async issueCredentialCrossDevice(data){
        return await this.issueCredentialSameDevice("x-device",data);
    }

    async getConfiguration(){
        var data = '';
        var config = {
            method: 'get',
            url: this.#issuerUri+'/issuer-api/default/config/getConfiguration',
            headers: { 
                'accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            data : data
        };
        return await this.#makeRequest(config)

    }

    async createCredential(data,type){
        if(type=="PID")
            return this.#createPID(data);
        if(type=="EAA")
            return this.#createEAA(data);
        return;
    }

    #createPID(data){
        return JSON.stringify({
            "credentials": [
                {
                    "credentialData": {
                    "credentialSubject": {
                        "currentAddress": [
                            data.currentAddress
                        ],
                        "dateOfBirth": data.dateOfBirth,
                        "familyName": data.familyName,
                        "firstName": data.firstName,
                        "gender": data.gender,
                        "id": this.#crypto.randomUUID(),
                        "nameAndFamilyNameAtBirth": data.nameAndFamilyNameAtBirth,
                        "personalIdentifier": data.personalIdentifier,
                        "placeOfBirth": data.placeOfBirth
                        }
                    },
                    "type": "PID"
                }
            ]
        });
    }

    #createEAA(data){
        data.id=this.#crypto.randomUUID();
        return JSON.stringify({
            "credentials": [
                {
                    "credentialData": {
                        "credentialSubject": data
                    },
                    "type": "EAA"
                }
            ]
        });
    }
}

//Export for public uses
module.exports = {
    OpenIdController:OpenIdController
}

