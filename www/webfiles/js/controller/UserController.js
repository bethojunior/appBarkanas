class User{

    static authenticate(email , pass , callback){
        Connect.request("User/Authenticate" , "POST" , {"email" : email , "pass" : pass} , function(data){
            callback(data);
        });
    };

    static checkEmail(email , callback){
        var params = {
            "email" : email
        }
        Connect.request("User/checkEmail" , "POST" , params , (data)=>{
            callback(data);
        });
    };

    static insertUser(name , email , tel , endereco , pass , typeUser , callback){
        
        var params = {
            "name" : name , 
            "email" : email , 
            "tel" : tel , 
            "endereco" : endereco , 
            "pass" : pass , 
            "typeUser" : typeUser
        };

        Connect.request("User/insertUser" , "POST" , params , (data)=>{
            callback(data);
        });
    };


}