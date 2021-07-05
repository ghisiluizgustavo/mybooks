# 📚 myBooks

<hr/>

<h2> Saiba mais sobre a sua estante online </h2>

<p> myBooks é um projeto desenvolvido na disciplina de <b> programação para web I </b> onde você pode aproveitar 
seus serviços para deixar registrado suas leituras atuais e finalizadas, além de montar sua lista de desejos e acessar 
essas informações em qualquer lugar com acesso a internet.</p>

<h3> 📕 Desenvolvimento: </h3>

<ul>
  <li> HTML </li>
  <li> CSS </li>
  <li> JavaScript </li>
</ul>

<hr/>

<h3> 📗 Principais métodos: </h3>

<p> myBooks utiliza do método fetch para se comunicar com a API onde está os registros cadastrados. Através desse método, ele envia em seu header a requisição, 
passando o método e demais dados caso necessário. Verifique uma função de exemplo de <a href="./pages/livros/main.js">listagem de livros</a>: </p>

```javascript
// API dos livros
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

```

<hr/>

<h3> 📙 Contribuidores: </h3>

<ul>
  <li><a href="https://www.linkedin.com/in/jannaina-sangaletti-3a8b47171/"> Jannaina </a></li>
  <li><a href="https://www.linkedin.com/in/luiz-gustavo-ghisi-flores-88bb61171/">Luiz Gustavo </a></li>
</ul>

<hr/>

<h3> 📘 Outras observações: </h3>

<p> myBooks é um site responsivo e desenvolvido sem uso de Frameworks com o intuito de por em prática o conteúdo abordado em sala de aula durante o semestre de 2021/1.</p>
