
var banco = [
    {
        "nome":"Caldo de cana",
        "valor":"2,56",
        "descricao":"bebida a base de caldo de cana",
        "img":"img/caldo-cana.jpg"
    },
    {
        "nome":"Caldo",
        "valor":"5,99",
        "descricao":"alimento quente",
        "img":"img/caldo.jpg"
    },
    {
        "nome":"Coxinha",
        "valor":"3,00",
        "descricao":"salgado frito",
        "img":"img/coxinha.jpg"
    },
    {
        "nome":"Hamburguer",
        "valor":"5,00",
        "descricao":"pão de brioche,carne de 50g, queijo cheddar",
        "img":"img/hamburguer.jpg"
    },
    {
        "nome":"Pastel",
        "valor":"4,00",
        "descricao":"Pastel Frito",
        "img":"img/pastel.jpg"
    },
    {
        "nome":"Refrigerante",
        "valor":"3,50",
        "descricao":"lata 350ml",
        "img":"img/refri_latas.jpg"
    }
];

var carregar_vitrine = function(){
var carrinho =[];

    var html='';
        banco.forEach(function(campo,i){
            html +='<div class="row mb-3 center">'+
            '<div class="col-lg-4 col-md-4 col-12">'+
                '<div class="card">'+
                    '<img src="'+campo.img+'" alt="'+campo.descricao+'" class="card-img-top" alt="'+campo.descricao+'">'+
                        '<div class="card-body">'+
                            '<div class="descricao-produto">'+
                                '<div class="nome-produto">'+campo.nome+'</div>'+
                                '<div class="valor-produto"><span>R$</span>'+campo.valor+'</div>'+
                                '<a href="detalhe-produto.html?produto='+i+'"  class="btn btn-info detalhe">add</a>'+
                            '</div>'+
                        '</div>'+
                '</div>'+
                '</div>'+
            '</div>';
                var container = document.getElementById('lista');
                    
                    if(container != null){
                        container.innerHTML=html;
                    }
        });
}
//carregar detalhe
var carregar_detalhe = function(produto){
    var carrinho =[];
    
        var html='';
            banco.forEach(function(campo,i){
                
                if(i == produto){
                    html +='<div class="row mb-3 center">'+
                    '<div class="col-lg-4 col-md-4 col-12">'+
                        '<div class="card">'+
                            '<img src="'+campo.img+'" alt="'+campo.descricao+'" class="card-img-top" alt="'+campo.descricao+'">'+
                                '<div class="card-body">'+
                                    '<div class="descricao-produto">'+
                                        '<div class="nome-produto">'+campo.nome+'</div>'+
                                        '<div class="valor-produto"><span>R$</span>'+campo.valor+'</div>'+
                                        '<button  class="btn btn-info detalhe" onclick="salvarCarrinho('+i+')">add</button>'+
                                    '</div>'+
                                '</div>'+
                        '</div>'+
                        '</div>'+
                    '</div>';
                }
                 
                var container = document.querySelector('.container');
                        
                        if(container != null){
                            container.innerHTML=html;
                        }
            });
    }
// salvar-carrinho
var salvarCarrinho = function(produto){
    console.log('o produto ',banco[produto]);

    if(localStorage.getItem('carrinho') != null){
        let localBase = localStorage.getItem('carrinho');
        let jp = JSON.parse(localBase);
        jp.push(banco[produto]);
        
        localStorage.setItem('carrinho',JSON.stringify(jp));

    }else{
        let localBase2 =[];
        localBase2.push(banco[produto]);
        localStorage.setItem('carrinho',JSON.stringify(localBase2));
    }
   
}

//carregar carrinho mostrador topo
var mostrarQtdCarrinho = function(){
    if(localStorage.getItem('carrinho') != null){
        let localBase = localStorage.getItem('carrinho');
        let jp = JSON.parse(localBase);
        let qtd = jp.length;
        let qdi = document.querySelector('#quantidade_d_itens');
        if(qdi != null){
            document.querySelector('#quantidade_d_itens').innerHTML = ''+qtd;
        }
    }else{
        let qdi = document.querySelector('#quantidade_d_itens');
        if(qdi != null){
            document.querySelector('#quantidade_d_itens').innerHTML = '0';
        }
    }
   
}

//carregar carrinho
var mostrarCarrinho = function(){
    if(localStorage.getItem('carrinho') != null){
        let localBase = localStorage.getItem('carrinho');
        let jp = JSON.parse(localBase);
        var html='';
        let quantidadeValor = 0;
        jp.forEach(function(campo,i){
            quantidadeValor = parseFloat(campo.valor)+parseFloat(quantidadeValor);

            html +='<div class="row mb-3 center">'+
                        '<div class="col-lg-4 col-md-4 col-12">'+
                            '<div class="card">'+
                            '<div class="card-body">'+
                            '<div class="descricao-produto">'+
                                '<div class="nome-produto">'+campo.nome+'</div>'+
                                '<div class="valor-produto"> <span>R$</span>'+campo.valor+'</div>'+
                                '<div class="qtd-item">'+1+'</div>'+
                                '<div> <button alt="excluir do carrinho" class="btn btn-danger">X</button></div>'+
                            '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';

                let htmlCarrinho = document.querySelector('#listar-carrinho');
                let valorTotal = document.querySelector('#total-qtd');
                    if(htmlCarrinho != null){
                        htmlCarrinho.innerHTML=html;
                        valorTotal.innerHTML='<span>total:</span> R$ '+quantidadeValor;
                    }
        });
    }
}
//finalizar conta e xibir registro
var reciboMontar = function(){
    if(localStorage.getItem('carrinho') != null){
        let localBase = localStorage.getItem('carrinho');
        let jp = JSON.parse(localBase);
        var html='';
        let quantidadeValor = 0;
        jp.forEach(function(campo,i){
            quantidadeValor = parseFloat(campo.valor)+parseFloat(quantidadeValor);

            html +=' <li class="list-group-item"> '+campo.nome+' - R$ '+campo.valor+'  </li>';

                let htmlCarrinho = document.querySelector('.lista-recibo');
                let valorTotal = document.querySelector('.lista-recibo-total');
                    if(htmlCarrinho != null){
                        htmlCarrinho.innerHTML=html;
                        valorTotal.innerHTML='<li class="list-group-item"><span>total:</span> R$ '+quantidadeValor+'</li>';
                    }
        },function(){
            console.log(' finalizado agora!');
        });
    }
}
//limpar
var limparCache = function(){
    if(localStorage.getItem('carrinho') != null){
        console.log('limpo o cache!')
        localStorage.removeItem('carrinho');
    }
}
//======================================================
//carregar vitrine
carregar_vitrine();
//carregar pagina
window.addEventListener('load',function(e){
        const params = new URLSearchParams(window.location.search);
        //carregar vitrine
        if(params.get('produto') != null){
            let produtoId = params.get('produto');
            carregar_detalhe(produtoId);
        }
        //preencher quantidade
        mostrarQtdCarrinho();
        //carregar carrinho
        mostrarCarrinho();
        //carregar recibo
        reciboMontar();
});



