// API dos livros
const url = 'https://projeto-final-ppw.herokuapp.com/api/117408/';

// função para listar livros
function listarLivros() {   
    let req = fetch(url)
    let dado = req.then((response) => {
      return response.json()
    })
    
    dado.then((dado) => {
      dado.reverse().forEach(element => {
        // criar lista de livros
        criarLivro(element)
      });
    })
}

// criar lista de livros
function criarLivro(livro) {
    let lista = document.getElementById('lista');

    // formatando as datas
    let dataIni = new Date(livro.dataInicio)
    let dataFin = livro.dataFinalizacao !== "" ? new Date(livro.dataFinalizacao) : null

    let dataIniFormatada = ((dataIni.getDate() )) + "/" + ((dataIni.getMonth() + 1)) + "/" + dataIni.getFullYear();
    let dataFinFormatada = dataFin !== null ? ((dataFin.getDate() )) + "/" + ((dataFin.getMonth() + 1)) + "/" + dataFin.getFullYear() : "------";

    // container sobre o livro
    let contLivro = document.createElement('div');

    contLivro.classList.add("item");
    contLivro.classList.add("grid-12");

    // imagem do livro
    let imagem = document.createElement('img');
    imagem.src = livro.imagem;
    imagem.alt = livro.nome;

    contLivro.appendChild(imagem);

    // informações
    let divInfo = document.createElement('div');
    divInfo.classList.add("informacoes");
    divInfo.classList.add("grid-8");

    // interior - parte um
    let divInterior = document.createElement('div');

    createAndAppend('h1', livro.nome, divInterior)
    createAndAppend('p', `Autor do livro: ${livro.autor}`, divInterior)
    createAndAppend('p', `Gênero do livro: ${livro.genero}`, divInterior)

    divInfo.appendChild(divInterior)

    // interior - parte dois
    divInterior = document.createElement('div');

    createAndAppend('h3', livro.status, divInterior)
    createAndAppend('p', `Data de início: ${dataIniFormatada}`, divInterior)
    createAndAppend('p', `Data finalização: ${dataFinFormatada}`, divInterior)

    divInfo.appendChild(divInterior)

    // interior - observação
    divInterior = document.createElement('div');

    let hr = document.createElement('hr')
    divInterior.appendChild(hr)

    if(livro.status === "Em andamento") {
        var conteudo = "Observação: Você ainda não finalizou essa leitura para adicionar uma observação."
    } else {
        var conteudo = `Observação: ${livro.observacao}`

    }
    
    createAndAppend('p', conteudo, divInterior)

    divInfo.appendChild(divInterior)

    // interior - botões
    divInterior = document.createElement('div');

    createAndAppend('button', 'Editar', divInterior)
    createAndAppend('button', 'Excluir', divInterior).addEventListener("click", () => {
        let res = confirm("Você realmente deseja excluir o livro " + livro.nome)
        if(!res){
            return
        }
        excluirLivro(livro._id)
    })

    divInfo.appendChild(divInterior)

    // adicionando a div com todas as informações no container
    contLivro.appendChild(divInfo)

    lista.appendChild(contLivro);
}

// criar elemento filho e adicionar ao elemento pai
function createAndAppend(tag, conteudo, pai) {
    let elemento = document.createElement(tag);

    elemento.textContent = conteudo
    pai.appendChild(elemento)

    return elemento
}

function excluirLivro(id){    
    let opcoes = {
        method: 'DELETE',
    }

    let req = fetch(url + id, opcoes)
    let dado = req.then( (res) => {
        return res.json()
    })

    dado.then( (dado) => {
        alert('O livro ' + dado.nome + ' foi excluido!')
        document.location.reload()
    })
}

// adicioanr livro na API
function adicionarLivro() {
    let imagem = document.getElementById("imagem").value
    let nome = document.getElementById("nome").value
    let autor = document.getElementById("autor").value
    let genero = document.getElementById("genero").value
    let status = document.getElementById("status").value
    let dataInicio = document.getElementById("dataInicio").value
    let dataFinalizacao = document.getElementById("dataFinalizacao").value
    let observacao = document.getElementById("observacao").value

    var livro = {
        "imagem": imagem,
        "nome": nome,
        "autor": autor,
        "genero": genero,
        "status": status,
        "dataInicio": dataInicio,
        "dataFinalizacao": dataFinalizacao,
        "observacao": observacao
    }
    if(verificarCampos(livro)) {
        
        
        let opcoes = {
            method: 'POST',
            body: JSON.stringify(livro),
            headers: {
                'content-type': 'application/json'
            }
        }
    
        let req = fetch(url, opcoes)
        let dado = req.then( (res) => {
            return res.json()
        })
    
        dado.then((dado) => {
            criarLivro(dado)
        })   
    }
    
}

// verificar se todos os campos foram preenchidos
function verificarCampos(livro) {
    if((livro.imagem === "") || (!isValidUrl(livro.imagem))) {
        alert("Informe o link do seu livro!")
        return false
    }

    if(livro.nome === "") {
        alert("Informe o nome do seu livro!")
        return false
    }

    if(livro.autor === "") {
        alert("Informe o autor do seu livro!")
        return false
    }

    if(livro.genero === "") {
        alert("Informe o gênero do seu livro!")
        return false
    }

    if(livro.dataInicio === "") {
        alert("Informe a data aproximada que você iniciou sua leitura!")
        return false
    }

    if((livro.status === "Finalizado") && ((livro.dataFinalizacao === "") || (livro.observacao === ""))) {
        alert("Caso tenha finalizado sua leitura, adicione a data aproximada da finalização e uma observação sobre o mesmo.")
        return false
    }

    if((livro.status === "Finalizado") && (new Date(livro.dataInicio) > new Date(livro.dataFinalizacao))) {
        alert("A data de finalização deve ser superior a data de início da leitura.")
        return false
    }

    return true
}

// valida se a imagem é um URL 
function isValidUrl(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
  
    return true;
  }
// Habilitar campo de data e observação caso status finalizado
function habilitaCampos() {
    let status = document.getElementById('status').value
    let dataFinalizacao = document.getElementById('dataFinalizacao')
    let observacao = document.getElementById('observacao')

    if(status === "Finalizado") {
        dataFinalizacao.removeAttribute("disabled", null)
        observacao.removeAttribute("disabled", null)
    } else {
        dataFinalizacao.setAttribute("disabled", "disabled")
        observacao.setAttribute("disabled", "disabled")

        dataFinalizacao.value = ""
        observacao.value = ""
    }
}