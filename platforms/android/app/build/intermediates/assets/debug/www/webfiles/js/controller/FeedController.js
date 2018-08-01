class FeedController {
    static getAllProducts(callback){
        Connect.request("Products/getAll" , "POST" , "{}" , (data)=>{
            callback(data);
        })
    }
}