lenghtRequest = 0;
valorFixed    = 0;
//add product on the list request for user aprove
function addProductInListRequest(){
    valueTotal = parseFloat(valueProduct) + valueTotal;
    console.log(valorFixed);
    let itemsSelected = "";
    let priceProduct = 0;

    for(let i in requestProducts){
        console.log(requestProducts);
        itemsSelected += `
            <div class='col s12 listPedidos'>
                <img class='col s4' src='${PATHIMAGE+requestProducts[i][3]}'>
                <div class='col s4 divBottom'>
                    <span>
                        ${requestProducts[i][1]}
                    </span> 
                    <div class='divider'></div>
                </div>
                <span class='col s2'>
                    R$${numberToReal(requestProducts[i][2])}
                    <br>
                    <i class="material-icons deleteProduct" cash='${requestProducts[i][2]}' value='${requestProducts[i][0]}'>remove</i>
                </span>
            </div>

        `;
    }
    valorT = valueTotal - valorFixed;
    document.getElementById("amountRequest").innerHTML = "R$"+ numberToReal(valorT);
    document.getElementById("itemsRequest").innerHTML = itemsSelected;
    
    for(let i in document.getElementsByClassName("deleteProduct")){
        document.getElementsByClassName("deleteProduct")[i].onclick = function(){
            let click = this.getAttribute("value");
            let indice;
            let valor = parseFloat(this.getAttribute("cash"));
            valorFixed = valorFixed + parseFloat(this.getAttribute("cash"));
            for(let i in requestProducts){
              if(requestProducts[i] == click){
                indice = i;
              }
            }
            document.getElementById("amountRequest").innerHTML = "R$"+ numberToReal(valueTotal);
            requestProducts.splice(indice, 1);
            addProductInListRequest();
            
        }
    }
}

//finish request and send for establishment
function finishRequest(){
    if(sendProducts.length != 0){
        RequestController.finishRequest((data)=>{
            if(data['status']){
                swal("Pedido enviado com sucesso" , "Aguarde a confirmação do seu pedido" , "success");
                document.getElementById("itemsRequest").innerHTML = "";
                sendProducts.length = 0;
                sendProducts    = [];
                requestProducts = [];
                valueTotal      = 0;
                document.getElementById("amountRequest").innerHTML = "R$"+ numberToReal(valueTotal);
                getRequestWait();
                return;
            }
            swal("Verifique sua conexão com a internet" , "" , "info");
        })
        return;
    }
    swal("","Você não possui nada em seu carrinho","info");
    
}
//get all request if don't finish
function getRequestWait(){
    let txt = "";
    RequestController.getRequestWait(idClient , "ENTREGUE" , (data)=>{
        let res = data['data'];
        for(let i in res){

            hora = res[i]['datanow'].substr(9,18);
            hora = hora.split("-");
            hora = hora[0]+":"+hora[1]+":"+hora[2];

            dataNow = res[i]['datanow'].substr(0,8);
            dataNow = dataNow.split("-");
            dataNow = dataNow[0]+"/"+dataNow[1]+"/"+dataNow[2];

            txt += `
                <div class='col s12 '>
                    <span class='f1 fB col s12'>Pedido de n° <label class='right'>${res[i]['id']}</label></span>
                    <span class='f1 fB col s12'>Status:      <label class='right backRed'>${res[i]['status']}</label></span>
                    <span class='f1 fB col s12'>Data:        <label class='right'>${dataNow} - ${hora} h</label></span>
                </div>
                <hr>
            `;               
        }
        document.getElementById("lastRequests").innerHTML = txt;    
        setTimeout(function(){
            getRequestWait();
        },1000);
    });
}

//get all request from user
function loadLastsRequests(){
    let txt = "";
    RequestController.getAllRequests(idClient , (data)=>{
        console.log(data);
        if(data['status']){
            res = data['data'];
            for(let i in data['data']){
                txt += `
                    <div class='col s12 '>
                        <span class='f1 fB col s12'>Pedido de n° <label class='right'>${res[i]['id']}</label></span>
                        <div class='divider'></div>
                        <span class='f1 fB col s12'>Status: <label class='right'>${res[i]['status']}</label></span>
                    </div>
                    <hr>
                `;
            }

            document.getElementById("lastRequestById").innerHTML = txt;
        }
    })
}

//check if have products on the list of requests
function checkIfHaveProducts(){
    if(sendProducts.length == 0){
        document.getElementById("finishRequestOptions").style.display = "none";
    }else{
        document.getElementById("finishRequestOptions").style.display = "block";
    }
}