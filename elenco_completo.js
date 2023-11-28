document.addEventListener("DOMContentLoaded", function () {

    const categorias = [
        { nome: 'Elenco Completo', link: 'elenco_completo.html' },

    ];

    const botoesContainer = document.getElementById('botoesContainer');

    categorias.forEach(categoria => {
        const botao = document.createElement('button');
        botao.textContent = categoria.nome;
        botao.onclick = () => filtrarAtletas(categoria.link);
        botoesContainer.appendChild(botao);
    });

    const filtrarAtletas = (categoria) => {

        window.location.href = categoria;
    };

    const url = "https://botafogo-atletas.mange.li";

    const cria_cartao = (entrada) => {
        const container_atleta = document.createElement("article");
        container_atleta.dataset.id = entrada.id;
        container_atleta.dataset.altura = entrada.altura;
        container_atleta.dataset.nome_completo = entrada.nome_completo;
        container_atleta.dataset.nascimento = entrada.nascimento;

        const titulo = document.createElement("h3");
        titulo.innerHTML = entrada.nome;
        const imagem = document.createElement("img");
        imagem.src = entrada.imagem;
        imagem.alt = `foto de ${entrada.nome}`;

        const saibaMaisBotao = document.createElement("button");
        saibaMaisBotao.innerHTML = "Saiba Mais";
        saibaMaisBotao.onclick = () => mostrarDetalhes(entrada);


        container_atleta.appendChild(titulo);
        container_atleta.appendChild(imagem);
        container_atleta.appendChild(saibaMaisBotao);

        container_atleta.onclick = manipulaClick;

        document.getElementById("jogadores-container").appendChild(container_atleta);
    };

    const mostrarDetalhes = (entrada) => {

        window.location.href = `detalhes_atleta.html?id=${entrada.id}`;
    };

    const manipulaClick = (e) => {
        const artigo = e.target.closest("article");
        document.cookie = `id=${artigo.dataset.id}`;
        document.cookie = `altura=${artigo.dataset.altura}`;
        document.cookie = `nome_completo=${artigo.dataset.nome_completo}`;
        document.cookie = `nascimento=${artigo.dataset.nascimento}`;

        window.location.href = `detalhes_atleta.html?id=${artigo.dataset.id}`;
    };

    const acha_cookie = (chave) => {
        const lista_de_cookies = document.cookie.split("; ");
        const procurado = lista_de_cookies.find((e) => e.startsWith(chave));
        return procurado.split("=")[1];
    };

    const pega_json = async (caminho) => {
        try {
            const resposta = await fetch(caminho);
            const dados = await resposta.json();
            return dados;
        } catch (error) {
            console.error("Erro ao obter dados:", error);
        }
    };

    pega_json(`${url}/all`)
    .then((r) => {
        console.log("Dados recebidos:", r);
        for (let atleta of r) {
            cria_cartao(atleta);
        }
        console.log("síncrono");
    })
    .catch((error) => console.error("Erro ao obter dados:", error));

    const redirecionaMasculino = () => {
        window.location.href = "elenco_masculino.html";
    };

    const redirecionaFeminino = () => {
        window.location.href = "elenco_feminino.html";
    };
    document.getElementById("linkMasculino").addEventListener("click", redirecionaMasculino);
    document.getElementById("linkFeminino").addEventListener("click", redirecionaFeminino);

});



