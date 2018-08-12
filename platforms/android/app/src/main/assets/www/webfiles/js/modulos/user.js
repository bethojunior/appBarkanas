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

function checkEmail(){
    email    = document.getElementById("email").value;
    User.checkEmail(email , (data)=>{
        let status = data['status'];
        console.log(status);
        if(status == true){
            Materialize.toast("Email já possui cadastro , tente com outro email" , 5000);
            document.getElementById("email").value = "";
        };
    });
};

function insertUser(){
    let typeUser = 2;
    let name     = document.getElementById("name").value;
    let email    = document.getElementById("email").value;
    let tel      = document.getElementById("tel").value;
    let endereco = document.getElementById("endereco").value;
    let pass     = document.getElementById("pass").value;
    let passOne  = document.getElementById("passOne").value;

    if(name == "" || email == "" || tel == "" || endereco == "" || pass == "" || passOne == ""){
        Materialize.toast("Preencha todos os campos" , 5000);
        return;
    }

    if(pass != passOne){
        Materialize.toast("As senhas não coincidem" , 5000);
        return;
    }
    
    document.getElementById("preloadUser").style.display = "block";
    document.getElementById("divFormInsert").style.display = "none";

    User.insertUser(name , email , tel , endereco , pass , typeUser , (data)=>{
        if(data['result']){
            swal("Cadastro realizado com sucesso" , "" , "success");
            setTimeout(()=>{
                window.location.href = "../../../index.html";
            },200);
            return;
        }

        swal("Ops" , "Verifique sua conexão com a internet" , "error");
    });

}