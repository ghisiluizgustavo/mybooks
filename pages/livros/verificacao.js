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

    if((livro.status === "Finalizado") && (new Date(livro.dataFinalizacao) > new Date())) {
        alert("A data de finalização não pode ser superior ao dia de hoje.")
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