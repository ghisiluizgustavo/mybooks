const url = 'https://projeto-final-ppw.herokuapp.com/api/117408/';

function listarLivros() {   
    let req = fetch(url)
    let dado = req.then((response) => {
      return response.json()
    })
    
    dado.then((dado) => {
      dado.forEach(element => {
        criarLivro(element)
      });
    })
}

function criarLivro(livro) {
    var lista = document.getElementById('lista');

    var div = document.createElement('div');

    div.classList.add("item");
    div.classList.add("grid-12");

    // imagem do livro
    var imagem = document.createElement('img');
    imagem.src = livro.imagem;
    imagem.alt = livro.nome;

    div.appendChild(imagem);

    // informações
    divInfo = document.createElement('div');
    divInfo.classList.add("informacoes");
    divInfo.classList.add("grid-8");

    // interior
    divInterior = document.createElement('div');

    // parte um
    titulo = `<h1> ${livro.nome} </h1>`
    divInterior.innerHTML = titulo

    p = `<p><b> Autor do livro: </b> ${livro.autor}</p>`
    divInterior.innerHTML += p

    p = `<p><b> Gênero do livro: </b> ${livro.genero}</p>`
    divInterior.innerHTML += p

    divInfo.innerHTML = divInterior.innerHTML

    // parte dois
    status = `<h3> ${livro.status} </h3>`
    divInterior.innerHTML = status

    p = `<p><b> Data de início: </b> ${livro.dataInicio}</p>`
    divInterior.innerHTML += p

    p = `<p><b> Data finalização: </b> ${livro.dataFinalizacao}</p>`
    divInterior.innerHTML += p

    divInfo.innerHTML += divInterior.innerHTML
    // novoTitulo.textContent = titulo;
    div.appendChild(divInfo);

    lista.appendChild(div);
}

listarLivros()

function adicionarLivro() {
    let imagem = document.getElementById("imagem").value
    let nome = document.getElementById("nome").value
    let autor = document.getElementById("autor").value
    let genero = document.getElementById("genero").value
    let status = document.getElementById("status").value
    let dataInicio = document.getElementById("dataInicio").value
    let dataFinalizacao = document.getElementById("dataFinalizacao").value
    let observacao = document.getElementById("observacao").value

    
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
        console.log(dado)
    })    

}