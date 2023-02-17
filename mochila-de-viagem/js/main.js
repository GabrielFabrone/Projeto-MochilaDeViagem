const form = document.getElementById("novoItem"); //Acessando o formulário e guardando seu valor em uma constante;
const lista = document.getElementById("lista")     //Constante que guarda o acesso a lista do formulário em Html;
const itens = JSON.parse(localStorage.getItem("itens")) || []  //Constante de array que armazena os objetos de itens criados pelo formulário

itens.forEach( (elemento)=>{  //Loop para adicionar os dados armazenados no LocalStorage, a lista Html, cada vez que o site for recarregado
    criaElemento(elemento)      //Ou seja, as informações inseridas, não são perdidas
})

form.addEventListener("submit", (evento) => {     //Adicionando uma ação pro Submit do Formulário
    evento.preventDefault();                      //Função que retira o comportamento padrão do formulário de se enviar para a página
    const nome = evento.target.elements["nome"] //Criando uma constante de acesso ao nome do item da lista do formulário
    const quantidade = evento.target.elements["quantidade"] //Criando uma constante de acesso ao numero do item da lista do formulário
    const existe = itens.find (elemento => elemento.nome === nome.value)  //Função que busca os nomes de todos os elementos do array, e verifica se o valor inserido no formulário já existe.
    
    const itemAtual = {
        "nome": nome.value,        //adicionando os itens criados a um objetos, para que possam ser armazenados no LocalStorage sem se sobrescrever
        "quantidade": quantidade.value,
    }

    if (existe) {               //Estrutura condicional feita para verificar se o elemento inserido já existe ou não
        itemAtual.id = existe.id       //Se o elemento já existe, ele continua com o mesmo data-id

        atualizaElemento(itemAtual)   //Função chamada para atualizar o elemento caso ele seja existente na lista

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual  //Sobreescrevendo o local storage para atualizar a quantidade dos itens que já existem através do Data-id        
    }else{
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id + 1 : 0   //Caso o elemento não exista, é criado uma novo data-id para ele, em ordem crescente.

        criaElemento(itemAtual) // Toda vez que o submit do formulário for ativado, ele criará uma "li" no html com os parâmetros dados na função

        itens.push(itemAtual)                           //Adicionando o objeto do itemAtual no Array de itens.
    }

    localStorage.setItem("itens", JSON.stringify(itens));   //Faz com que os itens adicionados sejam guardados no localStorage do Navegador.
    
    nome.value = ""                            //Após o submit do formulário, a informações contidas no input são limpas
    quantidade.value = ""

})

function criaElemento(item) {  //Declarando a função que cria os elementos após o submit do formulário
    
    const novoItem = document.createElement ("li") //Declarando que o novo item que será criado, será uma "li"
    novoItem.classList.add("item")                  //Adicionando a classe "item" para a "li", para que fique de acordo com o html padrão

    const numeroItem = document.createElement ("strong") //Criando a tag strong que armazena a quantidade na lista do Formulário em Html
    numeroItem.innerHTML = item.quantidade                    //Adicionando de fato o conteudo do elemento strong no html

    numeroItem.dataset.id = item.id          //Criando um id utilizando o data-atribute para o elemento strong.          

    novoItem.appendChild(numeroItem)         //adicionando o elemento strong com o valor, dentro da li

    novoItem.innerHTML += item.nome        //Adicionando o nome do item da lista após o valor dentro da li

    novoItem.appendChild(botaoDeleta())   //Chama a função para criação do botão no html da lista, dentro da li

    lista.appendChild(novoItem)          //Adicionando a nova Li criada anteriormente a "UL 'lista'" no Html
}

function atualizaElemento (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade   //Função que acessa e atualiza os dados dos elementos já criados
}

function botaoDeleta (id) {
    const elementoBotao = document.createElement("button")      //Declarando a criação do botão
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {        //Adicionando o evento de click do botão
        deletaElemento(this.parentNode, id)                         //Declarando que o evento de click do botão remove o elemento
    })
    return elementoBotao
}

function deletaElemento(tag,id) {     //Declarando a função de remoção do elemento
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)  //Encontrando e deletando o item do localStorage

    localStorage.setItem("itens", JSON.stringify(itens))
}