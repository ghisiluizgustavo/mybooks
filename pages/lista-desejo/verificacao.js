// criar elemento filho e adicionar ao elemento pai
function createAndAppend(tag, conteudo, pai) {
    let elemento = document.createElement(tag);
  
    elemento.textContent = conteudo
    pai.appendChild(elemento)
  
    return elemento
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
