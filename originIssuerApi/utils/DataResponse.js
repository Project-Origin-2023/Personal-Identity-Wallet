class DataResponse{
    success;
    data;
    description;
    error;
    
    constructor(s,d,des,e){
        this.description = des;
        this.error = e;
        this.success = s;
        this.data = d;
    }
}

//Export for public uses
module.exports = {
    DataResponse:DataResponse
}