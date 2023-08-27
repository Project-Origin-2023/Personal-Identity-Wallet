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
        response = response.data;
        return response;
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

    issueCredentialSameDevice(wallet,data){
        //TODO da togliere e ricevere come parametro
        data = JSON.stringify({
            "credentials": [
              {
                "credentialData": {
                  "credentialSubject": {
                    "currentAddress": [
                      "1 Boulevard de la Liberté, 59800 Lille"
                    ],
                    "dateOfBirth": "1993-04-08",
                    "familyName": "DOE",
                    "firstName": "Jane",
                    "gender": "FEMALE",
                    "id": "did:ebsi:2AEMAqXWKYMu1JHPAgGcga4dxu7ThgfgN95VyJBJGZbSJUtp",
                    "nameAndFamilyNameAtBirth": "Jane DOE",
                    "personalIdentifier": "0904008084H",
                    "placeOfBirth": "LILLE, FRANCE"
                  }
                },
                "type": "VerifiableId"
              }
            ]
          });

        var config = {
            method: 'post',
            url: this.#issuerUri+'/issuer-api/default/credentials/issuance/request?isPreAuthorized=true&walletId='+wallet,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };

        return this.#makeRequest(config);
    }

    issuerCredentialCrossDevice(data){
        return this.issueCredentialSameDevice("x-device",data);
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
}

//Export for public uses
module.exports = {
    OpenIdController:OpenIdController
}

