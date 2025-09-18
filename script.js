const produtos = [
    { nome: "Bolsa Azul", preco: "R$ 60,00", imagem: "bolsa azul.jpeg" },
    { nome: "Bolsa Lilás", preco: "R$ 160,00", imagem: "Bolsa lilas.jpeg" },
    { nome: "Jogo de Banheiro", preco: "R$ 60,00", imagem: "bolsa rosas.jpeg" },
    { nome: "Bolsa de praia mesclada", preco: "R$ 35,00", imagem: "bolsa de  praia mesclada.jpeg" },
    { nome: "Bolsa de praia", preco: "R$ 40,00", imagem: "bolsa de praia.jpeg" },
    { nome: "Bolsa Flores Arco-íris", preco: "R$ 70,00", imagem: "bolsa flores arco iris.jpeg" },
    { nome: "Bolsa de Praia Marrom", preco: "R$ 50,00", imagem: "Bolsa marrom.jpeg" },
    { nome: "Bolsa de praia Preta ", preco: "R$ 50,00", imagem: "bolsa preta.jpeg" },
    { nome: "Capa Galão invertido", preco: "R$ 70,00", imagem: "capa galão.jpeg" },
    { nome: "Chapéu Arco-íris", preco: "R$ 35,00", imagem: "Chapeu arco iris.jpeg" },
    { nome: "Chepéu Flores", preco: "R$ 50,00", imagem: "chapeu flores.jpeg" },
    { nome: "Jogo-americano Dourado", preco: "R$ 100,00", imagem: "Jogo americano.jpeg" },
    { nome: "Sousplat Tulipas", preco: "R$ 60,00", imagem: "supla tulipas.jpeg" },
    { nome: "Tapete Coração", preco: "R$ 80,00", imagem: "tapete coração.jpeg" },
    { nome: "Tapete Girasol", preco: "R$ 40,00", imagem: "tAPETE GiRASSOL.jpeg" },
    { nome: "Tapete laranja", preco: "R$ 40,00", imagem: "tapete laranja.jpeg" },
    { nome: "Tapete roxo", preco: "R$ 40,00", imagem: "tapete roxo.jpeg" },
    { nome: "Tapete mesclado", preco: "R$ 35,00", imagem: "tapete mesclado.jpeg" },
    { nome: "Trilho Arco-íris", preco: "R$ 35,00", imagem: "trilho arco iris.jpeg" },
    { nome: "Trilho Lilás", preco: "R$ 80,00", imagem: "trilho lilas.jpeg" },
    { nome: "Trilho Vermelho", preco: "R$ 80,00", imagem: "trlho vermelho.jpeg" },
];

const container = document.getElementById("produtos");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const carrinhoElement = document.getElementById("carrinho");
const btnAbrirCarrinho = document.getElementById("abrirCarrinho");
const btnFecharCarrinho = document.getElementById("fecharCarrinho");

let carrinho = [];

// Exibir produtos na página
produtos.forEach((produto, index) => {
    const div = document.createElement("div");
    div.classList.add("produto");
    div.style.width = "220px";
    div.style.height = "320px";
    div.style.border = "1px solid #ccc";
    div.style.borderRadius = "10px";
    div.style.padding = "10px";
    div.style.margin = "10px";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.justifyContent = "space-between";
    div.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

    div.innerHTML = `
        <div style="width:100%; height:200px; overflow:hidden; border-radius:8px; display:flex; align-items:center; justify-content:center;">
            <img src="${produto.imagem}" alt="${produto.nome}" 
                 style="width:100%; height:100%; object-fit:cover;">
        </div>
        <h3 style="text-align:center;">${produto.nome}</h3>
        <p style="text-align:center;">${produto.preco}</p>
        <button id="btn-${index}" onclick="adicionarAoCarrinho('${produto.nome}', '${produto.preco}', '${produto.imagem}', 'btn-${index}')">Adicionar ao Carrinho</button>
    `;
    container.appendChild(div);
});

// Função para adicionar ao carrinho
function adicionarAoCarrinho(nome, preco, imagem, botaoId) {
    carrinho.push({ nome, preco: parseFloat(preco.replace("R$ ", "").replace(",", ".")), imagem, botaoId });
    atualizarCarrinho();

    const botao = document.getElementById(botaoId);
    botao.innerText = "✅ Adicionado";
    botao.disabled = true;
}

// Função para atualizar carrinho
function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";
    carrinho.forEach((item, index) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.marginBottom = "10px";

        li.innerHTML = `
            <img src="${item.imagem}" 
                 alt="${item.nome}" 
                 style="width:60px; height:60px; object-fit:cover; border-radius:4px; margin-right:10px;">
            <span style="flex:1;">${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}</span>
            <button onclick="removerDoCarrinho(${index})"
                    style="background:red; color:white; border:none; font-size:10px; 
                           width:18px; height:18px; border-radius:50%; cursor:pointer; 
                           display:flex; align-items:center; justify-content:center;">
                ×
            </button>
        `;
        listaCarrinho.appendChild(li);
    });
    calcularTotal();
}

// Função para remover do carrinho
function removerDoCarrinho(index) {
    const produtoRemovido = carrinho[index];
    carrinho.splice(index, 1);
    atualizarCarrinho();

    if (produtoRemovido) {
        const botao = document.getElementById(produtoRemovido.botaoId);
        if (botao) {
            botao.innerText = "Adicionar ao Carrinho";
            botao.disabled = false;
        }
    }
}

// Função para calcular o total
function calcularTotal() {
    const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
    totalCarrinho.innerHTML = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
}

// Função para pagamento via WhatsApp
function pagarWhatsApp() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Quero finalizar minha compra:\n";
    carrinho.forEach(item => {
        mensagem += `- ${item.nome}: R$ ${item.preco.toFixed(2).replace(".", ",")}\n`;
    });

    let numeroWhatsApp = "557598922876"; 
    let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, "_blank");
}

// Controle de visibilidade do carrinho
btnAbrirCarrinho.addEventListener("click", function() {
    carrinhoElement.style.display = "block";
});

btnFecharCarrinho.addEventListener("click", function() {
    carrinhoElement.style.display = "none";
});

// Função de pesquisa
document.getElementById("barraPesquisa").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    filtrarProdutos(query);
});

// Função para filtrar os produtos
function filtrarProdutos(query) {
    container.innerHTML = "";
    const produtosFiltrados = produtos.filter(produto => 
        produto.nome.toLowerCase().includes(query)
    );

    produtosFiltrados.forEach((produto, index) => {
        const div = document.createElement("div");
        div.classList.add("produto");
        div.style.width = "220px";
        div.style.height = "320px";
        div.style.border = "1px solid #ccc";
        div.style.borderRadius = "10px";
        div.style.padding = "10px";
        div.style.margin = "10px";
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.alignItems = "center";
        div.style.justifyContent = "space-between";
        div.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

        div.innerHTML = `
            <div style="width:100%; height:200px; overflow:hidden; border-radius:8px; display:flex; align-items:center; justify-content:center;">
                <img src="${produto.imagem}" alt="${produto.nome}" 
                     style="width:100%; height:100%; object-fit:cover;">
            </div>
            <h3 style="text-align:center;">${produto.nome}</h3>
            <p style="text-align:center;">${produto.preco}</p>
            <button id="btn-${index}" onclick="adicionarAoCarrinho('${produto.nome}', '${produto.preco}', '${produto.imagem}', 'btn-${index}')">Adicionar ao Carrinho</button>
        `;
        container.appendChild(div);
    });
}

// Exibir todos os produtos no início
filtrarProdutos("");
