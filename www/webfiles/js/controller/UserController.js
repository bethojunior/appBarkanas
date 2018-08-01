class User{

    static authenticate(email , pass , callback){
        Connect.request("User/Authenticate" , "POST" , {"email" : email , "pass" : pass} , function(data){
            callback(data);
        })
    }

}