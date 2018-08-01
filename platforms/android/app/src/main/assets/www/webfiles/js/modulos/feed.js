var requestProducts = [];
var sendProducts = [];
var valueTotal = 0;
var idClient = 0;
var nameClient = "";

//load data from establisment
function loadFeed(dataUser){    
    idClient = dataUser['id'];
    console.log(dataUser['name'])
    FeedController.getAllProducts((data)=>{
        mountListProducts(data['data']);
        products = data['data'];
    })
}

function mountListProducts(data){
    let listProducts = "";
    for(let i in data){
        listProducts += `
            <div class='col s12 divShowProducts' value='${data[i]['id']}'>
                <img class='col s4' src='${PATHIMAGE+data[i]['foto']}'>
                <div class='col s5'>
                    <span class='nameProduct'>
                        ${data[i]['nome']}
                    </span>
                    <div class='divider'></div>
                    <br>
                    <span class='right valueProduct'>
                        <b>R$${numberToReal(data[i]['valor'])}</b>
                    </span>
                </div>
                <span class='col s3 descricaoProduct'>
                    ${data[i]['descricao'].substr(0,50)}
                </span>
            </div>
        `; 
    }
    document.getElementById("showOptionsOnFeed").innerHTML = listProducts;

    for(let i in document.getElementsByClassName("divShowProducts")){
        document.getElementsByClassName("divShowProducts")[i].onclick = function(){
            openModalByProduct(this.getAttribute("value") , data);
        }
    }
    Preloader.hiddenPreload("pageContent");
}

//open modal with informations about product selected
function openModalByProduct(id , data){
    $('#modalProduct').modal('open');
    txt = "";
    idSelect = "";
    for(let i in data){
        if(data[i]['id'] == id){
            idSelect = data[i];
            txt = `
                <div class='col s12'>
                    <img class='col s12 imgModal' src='${PATHIMAGE+idSelect['foto']}'>
                    <a class="btn-floating btn-small right waves-effect waves-light red addThisProudct" dataAbout='${idSelect['descricao']}' dataImage='${idSelect['foto']}' dataValue='${idSelect['valor']}' data='${idSelect['nome']}' value='${idSelect['id']}' >
                        <i class="material-icons" value='${data['id']}'>add</i>
                    </a>  
                    <span class='col s12 titleProduct'>
                        ${idSelect['nome'] + " R$"+numberToReal(idSelect['valor'])}
                    </span>
                    <label class='col s12 aboutProduct'>
                        ${idSelect['descricao']}
                    </label>
                </div>
            `;
        }
    }

    document.getElementById("modalProduct").innerHTML = txt;

    //read list for add product selected on list of request
    for(let i in document.getElementsByClassName("addThisProudct")){
        document.getElementsByClassName("addThisProudct")[i].onclick = function(){
            idProduct    = this.getAttribute("value");
            nameProduct  = this.getAttribute("data");
            valueProduct = this.getAttribute("dataValue")
            imageProduct = this.getAttribute("dataImage");
            aboutProduct = this.getAttribute("dataAbout");
            requestProducts.push([idProduct , nameProduct , valueProduct , imageProduct , aboutProduct]);
            sendProducts.push(idProduct);
            console.log(sendProducts);
            addProductInListRequest();
            Materialize.toast(nameProduct + " adcionado", 1000);
            $('#modalProduct').modal('close');
        }
    }
}