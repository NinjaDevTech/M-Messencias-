
const WHATSAPP = "557781098626";

const produtos = [
  {
    nome: "Inebriante Zyad",
    marca: "Hinode",
    categoria: "masculino",
    preco: 199.99,
    imagem: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=85",
    descricao: "Uma fragrância marcante para quem tem presença."
  },
  {
    nome: "Inebriante Eau de Parfum",
    marca: "Hinode",
    categoria: "masculino",
    preco: 199.99,
    imagem: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=85",
    descricao: "Elegância e intensidade em uma fragrância sofisticada."
  },
  {
    nome: "Grand Reserve Hinode",
    marca: "Hinode",
    categoria: "masculino",
    preco: 199.99,
    imagem: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=85",
    descricao: "Uma fragrância envolvente, com personalidade e presença."
  },
  {
    nome: "Grand Hinode",
    marca: "Hinode",
    categoria: "masculino",
    preco: 199.99,
    imagem: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=700&q=85",
    descricao: "Sofisticação para acompanhar os seus melhores momentos."
  }
];

const listaProdutos = document.querySelector(".products");
const botoesCategoria = document.querySelectorAll(".category");
const emptyState = document.getElementById("emptyState");

let categoriaAtual = "todos";

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderizarProdutos() {
  const marcaSelecionada = document.getElementById("filtroMarca")?.value || "todas";
  const precoMinimo = Number(document.getElementById("precoMinimo")?.value || 0);
  const precoMaximo = Number(document.getElementById("precoMaximo")?.value || Infinity);

  const filtrados = produtos.filter(produto => {
    const combinaCategoria =
      categoriaAtual === "todos" || produto.categoria === categoriaAtual;

    const combinaMarca =
      marcaSelecionada === "todas" || produto.marca === marcaSelecionada;

    const combinaPreco =
      produto.preco >= precoMinimo && produto.preco <= precoMaximo;

    return combinaCategoria && combinaMarca && combinaPreco;
  });

  listaProdutos.innerHTML = filtrados.map(produto => {
    const mensagem = `Olá! Tenho interesse no perfume ${produto.nome} por ${formatarPreco(produto.preco)}.`;

    const linkWhatsApp = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    return `
      <article class="product">
        <div class="product-image">
          <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
        </div>

        <div class="product-info">
          <span class="product-tag">${produto.marca} · ${produto.categoria}</span>
          <h3>${produto.nome}</h3>
          <p class="product-description">${produto.descricao}</p>
          <strong class="price">${formatarPreco(produto.preco)}</strong>

          <a class="button"
             href="${linkWhatsApp}"
             target="_blank"
             rel="noopener noreferrer">
            PEDIR PELO WHATSAPP
          </a>
        </div>
      </article>
    `;
  }).join("");

  emptyState.style.display = filtrados.length === 0 ? "block" : "none";
}

botoesCategoria.forEach(botao => {
  botao.addEventListener("click", () => {
    categoriaAtual = botao.dataset.filter;

    botoesCategoria.forEach(item => {
      item.classList.toggle("active", item === botao);
    });

    renderizarProdutos();
  });
});

document.getElementById("filtroMarca")?.addEventListener("change", renderizarProdutos);
document.getElementById("precoMinimo")?.addEventListener("input", renderizarProdutos);
document.getElementById("precoMaximo")?.addEventListener("input", renderizarProdutos);

renderizarProdutos();

