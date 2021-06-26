const url = 'https://projeto-final-ppw.herokuapp.com/api/116533/';

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

function criarLivro(livro) {
  let lista = document.getElementById('lista');

  // container sobre o livro
  let contLivro = document.createElement('div');

  contLivro.classList.add("livro");

  // imagem do livro
  let imagem = document.createElement('img');
  imagem.src = livro.imagem;
  imagem.alt = livro.nome;

  contLivro.appendChild(imagem);

  // informações
  createAndAppend('p', `Titulo: ${livro.nome}`, contLivro)
  createAndAppend('p', `Autor: ${livro.autor}`, contLivro)
  createAndAppend('button', "Excluir", contLivro).addEventListener("click", () => {
    let res = confirm(`Você realmente deseja excluir o livro ${livro.nome} da sua lista de desejos?`)
    if(!res){
        return
    }
    excluirLivro(livro._id)
})

  lista.appendChild(contLivro)
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

// adicionar livro na API [POST]
function cadastrarLivro() {
  let imagem = document.getElementById("imagem")
  let nome = document.getElementById("nome")
  let autor = document.getElementById("autor")

  let livro = {
      "imagem": imagem.value,
      "nome": nome.value,
      "autor": autor.value
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
  }
}