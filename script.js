
const WHATSAPP = "557781098626";

const produtos = [
  {
    nome: "Empire",
    marca: "Hinode",
    categoria: "masculino",
    preco: 199.90,
    imagem: "images/empire.png",
    descricao: "Uma fragrância marcante e sofisticada para quem transmite presença."
  },
  {
    nome: "Empire Absolut",
    marca: "Hinode",
    categoria: "masculino",
    preco: 199.90,
    imagem: "https://hinodegroup.vtexassets.com/arquivos/ids/164589/10217---EMPIRE-ABSOLUT_4.png?v=639090102332100000",
    descricao: "Uma combinação de personalidade e elegância para momentos especiais."
  },
  {
    nome: "Empire Gold",
    marca: "Hinode",
    categoria: "masculino",
    preco: 199.90,
    imagem: "https://hinodegroup.vtexassets.com/arquivos/ids/164609-800-auto?aspect=true&height=auto&v=639090102950000000&width=800",
    descricao: "Uma fragrância sofisticada para quem gosta de se destacar."
  },
  {
    nome: "Empire Icon",
    marca: "Hinode",
    categoria: "masculino",
    preco: 279.90,
    imagem: "https://hinodeb2b.vtexassets.com/arquivos/ids/158277/Still-Empire-Icon.png?v=638499896159800000",
    descricao: "Uma fragrância intensa que representa estilo e personalidade."
  },
  {
    nome: "Empire Intense",
    marca: "Hinode",
    categoria: "masculino",
    preco: 199.90,
    imagem: "https://hinodegroup.vtexassets.com/arquivos/ids/164672-800-auto?aspect=true&height=auto&v=639090122417270000&width=800",
    descricao: "Uma fragrância envolvente, ideal para quem prefere presença marcante."
  },
  {
    nome: "Empire Legacy",
    marca: "Hinode",
    categoria: "masculino",
    preco: 199.90,
    imagem: "https://hinodegroup.vtexassets.com/arquivos/ids/164661/4.png?v=639090121463300000",
    descricao: "Sofisticação e personalidade em uma fragrância memorável."
  },
  {
    nome: "Empire Sport",
    marca: "Hinode",
    categoria: "masculino",
    preco: 199.90,
    imagem: "https://hinodegroup.vtexassets.com/arquivos/ids/164599-800-auto?aspect=true&height=auto&v=639090102372430000&width=800",
    descricao: "Uma fragrância com perfil moderno para acompanhar sua rotina."
  },
  {
    nome: "Empire The One",
    marca: "Hinode",
    categoria: "masculino",
    preco: 279.90,
    imagem: "https://acdn-us.mitiendanube.com/stores/003/701/144/products/empire-the-one-deo-parfum-100ml-2-987bdfded063d28d6d17436853159245-1024-1024.webp",
    descricao: "Uma fragrância elegante para quem busca exclusividade."
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
  if (!listaProdutos || !emptyState) return;

  const marcaSelecionada =
    document.getElementById("filtroMarca")?.value || "todas";

  const precoMinimo = Number(
    document.getElementById("precoMinimo")?.value || 0
  );

  const precoMaximo = Number(
    document.getElementById("precoMaximo")?.value || Infinity
  );

  const filtrados = produtos.filter(produto => {
    const combinaCategoria =
      categoriaAtual === "todos" ||
      produto.categoria === categoriaAtual;

    const combinaMarca =
      marcaSelecionada === "todas" ||
      produto.marca === marcaSelecionada;

    const combinaPreco =
      produto.preco >= precoMinimo &&
      produto.preco <= precoMaximo;

    return combinaCategoria && combinaMarca && combinaPreco;
  });

  listaProdutos.innerHTML = filtrados.map(produto => {
    const mensagem =
      `Olá! Tenho interesse no perfume ${produto.nome}. ` +
      `O valor de referência apresentado é ${formatarPreco(produto.preco)}. ` +
      `Gostaria de confirmar disponibilidade e preço atualizado.`;

    const linkWhatsApp =
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    return `
      <article class="product">
        <div class="product-image">
          <img
            src="${produto.imagem}"
            alt="${produto.nome}"
            loading="lazy"
          >
        </div>

        <div class="product-info">
          <span class="product-tag">
            ${produto.marca} · Masculino
          </span>

          <h3>${produto.nome}</h3>

          <p class="product-description">
            ${produto.descricao}
          </p>

          <strong class="price">
            ${formatarPreco(produto.preco)}
          </strong>

          <a
            class="button"
            href="${linkWhatsApp}"
            target="_blank"
            rel="noopener noreferrer"
          >
            PEDIR PELO WHATSAPP
          </a>
        </div>
      </article>
    `;
  }).join("");

  emptyState.style.display =
    filtrados.length === 0 ? "block" : "none";
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

document
  .getElementById("filtroMarca")
  ?.addEventListener("change", renderizarProdutos);

document
  .getElementById("precoMinimo")
  ?.addEventListener("input", renderizarProdutos);

document
  .getElementById("precoMaximo")
  ?.addEventListener("input", renderizarProdutos);

renderizarProdutos();
