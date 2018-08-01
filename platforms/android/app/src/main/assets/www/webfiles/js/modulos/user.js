if(document.getElementById("btnLogar") != null ){
    document.getElementById("btnLogar").onclick = function(){
        let email = document.getElementById("emailUser").value;
        let pass  = document.getElementById("passUser").value;

        if(email == "" || pass == ""){
            swal("" , "Preencha todos os campos" , "info");
            return;
        }
        Preloader.showPreload("geralLogin");
        User.authenticate(email , pass , (data)=> {
            if(!data['status']){
                swal("ops" , "Usuário e/ou senhas inválidos" , "error");
                Preloader.hiddenPreload("geralLogin");
                return;
            }
            localStorage.setItem("dataUser" , JSON.stringify(data['data']));
            window.location.href = "webfiles/views/index/index.html";
        });
    
    }
}

function checkSession(){
    if(JSON.parse(localStorage.getItem("dataUser")) == null || JSON.parse(localStorage.getItem("dataUser")) == undefined){
        console.log(JSON.parse(localStorage.getItem("dataUser")));
        window.location.href = "../../../index.html";
    }
}