const url = 'https://projeto-final-ppw.herokuapp.com/api/117408/';

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