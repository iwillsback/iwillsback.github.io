const url = "https://botafogo-atletas.mange.li/masculino";

const cria_cartao = (entrada) => {
    const container_atleta = document.createElement("article");
  container_atleta.style.width = "20rem";
  container_atleta.style.backgroundColor = "#777777";
  container_atleta.style.textAlign = "center";
  container_atleta.style.margin = "auto";
  container_atleta.style.marginBottom = "11px"; 
  container_atleta.style.borderRadius = "10px"; 

  container_atleta.dataset.id = entrada.id;
  container_atleta.dataset.altura = entrada.altura;
  container_atleta.dataset.nome_completo = entrada.nome_completo;
  container_atleta.dataset.nascimento = entrada.nascimento;

  const titulo = document.createElement("h3");
  titulo.innerHTML = entrada.nome;
  const imagem = document.createElement("img");
  imagem.src = entrada.imagem;
  imagem.alt = `foto de ${entrada.nome}`;
  const descricao = document.createElement("p");
  descricao.innerHTML = entrada.descricao;
  descricao.style.display = "none"; 

  container_atleta.appendChild(titulo);
  container_atleta.appendChild(imagem);
  container_atleta.appendChild(descricao);

  container_atleta.onclick = manipulaClick;

  document.body.appendChild(container_atleta);
};

const criaPaginaDetalhes = (entrada) => {
    const detalhesContainer = document.createElement("div");
    detalhesContainer.style.display = "flex";
    detalhesContainer.style.flexDirection = "column";
    detalhesContainer.style.alignItems = "center";
    detalhesContainer.style.justifyContent = "center";
    detalhesContainer.style.height = "100vh";
    detalhesContainer.style.padding = "20px";

    const detalhesImagem = document.createElement("img");
    detalhesImagem.style.maxWidth = "100%";
    detalhesImagem.style.marginBottom = "20px";
    detalhesImagem.src = entrada.imagem;
    detalhesImagem.alt = `foto de ${entrada.nome}`;
    detalhesImagem.style.display = "block";
    detalhesImagem.style.marginLeft = "auto";
    detalhesImagem.style.marginRight = "auto";

    const detalhesTexto = document.createElement("p");
    detalhesTexto.style.textAlign = "center";
    detalhesTexto.innerHTML = entrada.descricao;

    const botaoVoltar = document.createElement("button");
    botaoVoltar.innerHTML = "Voltar";
    botaoVoltar.onclick = voltar;

    
    detalhesContainer.appendChild(detalhesImagem);
    detalhesContainer.appendChild(detalhesTexto);
    detalhesContainer.appendChild(botaoVoltar);

    
    document.body.innerHTML = "";
    document.body.appendChild(detalhesContainer);
};

const voltar = () => {
    window.location.href = "elenco_masculino.html";
};

const manipulaClick = (e) => {
  const artigo = e.target.closest("article");
  document.cookie = `id=${artigo.dataset.id}`;
  document.cookie = `altura=${artigo.dataset.altura}`;
  document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
  document.cookie = `nascimento=${artigo.dataset.nascimento}`;

  
  criaPaginaDetalhes({
    imagem: artigo.querySelector("img").src,
    descricao: artigo.querySelector("p").innerHTML
  });
};

const acha_cookie = (chave) => {
    const lista_de_cookies = document.cookie.split("; ");
  const procurado = lista_de_cookies.find((e) => e.startsWith(chave));
  return procurado.split("=")[1];
};

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
  const dados = await resposta.json();
  return dados;
};

pega_json(`${url}`)
    .then((r) => {
        for (let atleta of r) {
            cria_cartao(atleta);
        }
        console.log("síncrono");
    })
    .catch((error) => console.error("Erro ao obter dados:", error));
