class DataResponse{
    success;
    description;
    data;
    error;
    
    constructor(s,des,d,e){
        this.success = s;
        this.description = des;
        this.data = d;
        this.error = e;
    }
}

//Export for public uses
module.exports = {
    DataResponse:DataResponse
}