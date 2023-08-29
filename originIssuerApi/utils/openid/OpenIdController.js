class OpenIdController {
    #axios;
    #issuerUri;
    
    constructor(){
        
        this.#issuerUri = 'http://openid.issuer.origin'
        this.#axios = require('axios');
    }

    async #makeRequest(config){
        var res;
        var response = await this.#axios(config);
        return {success:true,data:response.data};
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

    getConfiguration(){
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
        return this.#makeRequest(config)

    }

    async createCredential(data,type){
        var credential;
        if(type=="PID"){
            credential = JSON.stringify({
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
                        "id": "did:ebsi:2AEMAqXWKYMu1JHPAgGcga4dxu7ThgfgN95VyJBJGZbSJUtp",
                        "nameAndFamilyNameAtBirth": "Jane DOE",
                        "personalIdentifier": data.personalIdentifier,
                        "placeOfBirth": "data.placeOfBirth"
                    }
                    },
                    "type": "PID"
                }
                ]
            })
        }else if(type=="EAA"){
            credential = JSON.stringify({
                "credentials": [
                {
                    "credentialData": {
                    "credentialSubject": {
                        "status":data.status,
                        "personalIdentifier": data.personalIdentifier,
                    }
                    },
                    "type": "EAA"
                }
                ]
            })
        }
        return credential;
    }
}

//Export for public uses
module.exports = {
    OpenIdController:OpenIdController
}

