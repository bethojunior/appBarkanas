
// function initLoad(){
//     $('ul.tabs').tabs();
//     Preloader.showPreload("pageContent");

//     if(JSON.parse(localStorage.getItem("dataUser")) == null || JSON.parse(localStorage.getItem("dataUser")) == undefined){
//         console.log(JSON.parse(localStorage.getItem("dataUser")));
//         window.location.href = "../../../index.html";
//     }
    
//     dados = JSON.parse(localStorage.getItem("dataUser"));
//     dataUser = dados[0];
//     loadFeed(dataUser);
//     getRequestWait();
    
// }


function initLoad(){
    $('ul.tabs').tabs();
    Preloader.showPreload("pageContent");
    dados = JSON.parse(localStorage.getItem("dataUser"));
    
    loadFeed(dados[0]);
    getRequestWait();
    checkSession();
    loadLastsRequests();
}
