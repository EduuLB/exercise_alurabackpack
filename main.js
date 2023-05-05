const form = document.getElementById("novoItem"); // Coloca em uma const o formulario   
const lista = document.getElementById("lista"); //coloca em uma const a Ul
const itens = JSON.parse(localStorage.getItem("itens")) || [] //coloca em ITENS tudo o que tiver no local storage, ou em caso de não ter nada, ele retona um array vazio


// o foreach roda buscando cada elemento em itens, e executando com ele a função criaElemento

itens.forEach( (elemento) => {
    criaElemento(elemento)
});


form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
    }

    if (existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)      
        itens[itens.findIndex(elemento => elemento.id === existe)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)
        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""

})


function criaElemento(itemAtual) {
  
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')

    numeroItem.innerHTML = itemAtual.quantidade
    numeroItem.dataset.id = itemAtual.id

    novoItem.appendChild(numeroItem)
    novoItem.innerHTML += itemAtual.nome

    novoItem.appendChild(botaoDeleta(itemAtual.id))

    lista.appendChild(novoItem)
}

function atualizaElemento (itemAtual){
    document.querySelector("[data-id= '"+ itemAtual.id + "']").innerHTML = itemAtual.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.classList.add("botao")
    elementoBotao.innerHTML = "X"

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id) 
        // o "this" traz para nós o elemento especifico que foi clicado, neste caso o Button
        // e o parentNode, traz o elemento PAI do this/button, neste caso, o LI, que é o que queremos que seja deletado
    })

    return elementoBotao
}
function deletaElemento(tagLi, id) {
    tagLi.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))


}