class Connect {
    
    static request(url , method = "GET" , params = {} , callback){
        $.ajax({
            url : HOST+url,
            method: method,
            data: params,
            success: function(response){
                callback(JSON.parse(response));
            },error:function(response){
                console.log("Erro na requisição ConnectionServer.request " + response);
            }
        })
    }

}