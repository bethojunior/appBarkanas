
class RequestController {
    static finishRequest(callback){
        Connect.request("Request/FinishRequest" , "POST" , {"idClient" : idClient , "requestProducts" : sendProducts , "valueTotal" : valueTotal}, function(data){
            callback(data);
        });
    }

    static getRequestWait(id , status , callback){
        Connect.request("request/GetLastRequestByClient" , "POST" , {"idClient" : id , "status" : status} , function(data){
            callback(data);
        })
    }

    static getAllRequests(id , callback){
        Connect.request("Request/getAllById" , "POST" , {"idClient" : id} , function(data){
            callback(data);
        })
    }
}