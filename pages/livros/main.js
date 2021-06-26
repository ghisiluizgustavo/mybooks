// API dos livros
const url = 'https://projeto-final-ppw.herokuapp.com/api/117408/';


// listar livros da API [GET]
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

    createAndAppend('button', 'Editar', divInterior).addEventListener("click", () => {
        pegarInfoLivro(livro._id)
    })
    
    createAndAppend('button', 'Excluir', divInterior).addEventListener("click", () => {
        let res = confirm(`Você realmente deseja excluir o livro ${livro.nome} da sua lista de leitura?`)
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

// pegar informações do livro selecionado
function pegarInfoLivro(id) {
    let req = fetch(url + id)
    let dado = req.then((response) => {
      return response.json()
    })
    
    dado.then((dado) => {
        setarCamposEditar(dado)
    })

    window.location.href = "#editarModal"
}

// setar campos nos input de editar
function setarCamposEditar(info) {
    let imagem = document.getElementById("imagemEdit")
    let nome = document.getElementById("nomeEdit")
    let autor = document.getElementById("autorEdit")
    let genero = document.getElementById("generoEdit")
    let status = document.getElementById("statusEdit")
    let dataInicio = document.getElementById("dataInicioEdit")
    let dataFinalizacao = document.getElementById("dataFinalizacaoEdit")
    let observacao = document.getElementById("observacaoEdit")
    let id = document.getElementById("idEdit")

    imagem.value = info.imagem
    nome.value = info.nome
    autor.value = info.autor
    genero.value = info.genero
    status.value = info.status
    dataInicio.value = info.dataInicio
    dataFinalizacao.value = info.dataFinalizacao
    observacao.value = info.observacao
    id.value = info._id
}

// editar livro na API [PUT]
function editarLivro(){
    let imagem = document.getElementById("imagemEdit").value
    let nome = document.getElementById("nomeEdit").value
    let autor = document.getElementById("autorEdit").value
    let genero = document.getElementById("generoEdit").value
    let status = document.getElementById("statusEdit").value
    let dataInicio = document.getElementById("dataInicioEdit").value
    let dataFinalizacao = document.getElementById("dataFinalizacaoEdit").value
    let observacao = document.getElementById("observacaoEdit").value
    let id = document.getElementById("idEdit").value

    let livro = {
        "imagem": imagem,
        "nome": nome,
        "autor": autor,
        "genero": genero,
        "status": status,
        "dataInicio": dataInicio,
        "dataFinalizacao": dataFinalizacao,
        "observacao": observacao
    }
    //se tirar isso ele pode enviar os dados em branco
    if(verificarCampos(livro)){
        let opcoes = {
            method: "PUT",
            body: JSON.stringify(livro),
            headers: {
                'content-type': 'application/json'
            }
        }
    
        let req = fetch(url + id, opcoes)
        let dado = req.then((res) => {
            return res.json()
        })
    
        dado.then((dado) => {
            window.location.href = "#"
            document.location.reload()
        })    
    }    
}

// excluir livro na API [DELETE]
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

// adicionar livro na API [POST]
function cadastrarLivro() {
    let imagem = document.getElementById("imagem")
    let nome = document.getElementById("nome")
    let autor = document.getElementById("autor")
    let genero = document.getElementById("genero")
    let status = document.getElementById("status")
    let dataInicio = document.getElementById("dataInicio")
    let dataFinalizacao = document.getElementById("dataFinalizacao")
    let observacao = document.getElementById("observacao")

    let livro = {
        "imagem": imagem.value,
        "nome": nome.value,
        "autor": autor.value,
        "genero": genero.value,
        "status": status.value,
        "dataInicio": dataInicio.value,
        "dataFinalizacao": dataFinalizacao.value,
        "observacao": observacao.value
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
            document.getElementById('lista').lastChild.scrollIntoView({
                behavior: 'smooth'
            })
        })   

        imagem.value = ""
        nome.value = ""
        autor.value = ""
        genero.value = ""
        dataInicio.value = ""
        dataFinalizacao.value = ""
        observacao.value = ""
    }
}
