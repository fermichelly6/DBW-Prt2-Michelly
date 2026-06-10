const detalhes = document.querySelector("#detalhes");
const loading = document.querySelector("#loading");
const erro = document.querySelector("#erro");

async function carregarDetalhes() {

  try {

    loading.textContent = "Carregando país...";
    erro.textContent = "";

    const parametros =
      new URLSearchParams(window.location.search);

    const nome =
      parametros.get("nome");

    const resposta = await fetch(
      `https://restcountries.com/v3.1/name/${nome}`
    );

    if (!resposta.ok) {
      throw new Error("Erro na API");
    }

    const dados = await resposta.json();

    const pais = dados[0];

    const capital =
      pais.capital?.[0] || "Não informado";

    const populacao =
      pais.population
        ? pais.population.toLocaleString()
        : "Não informado";

    const moeda =
      pais.currencies
        ? Object.values(
            pais.currencies
          )[0].name
        : "Não informado";

    const idiomas =
      pais.languages
        ? Object.values(
            pais.languages
          ).join(", ")
        : "Não informado";

    let descricao = "";

    switch (pais.name.common) {

      case "Argentina":
        descricao =
          "A Argentina é conhecida pelo tango, pela paixão pelo futebol e pela culinária famosa, como as empanadas e o churrasco argentino. Buenos Aires é uma das cidades mais conhecidas da América do Sul.";
        break;

      case "Brazil":
        descricao =
          "O Brasil é famoso pelo carnaval, pelas praias, pela Floresta Amazônica e pelo futebol. O país possui uma cultura muito diversa e rica em músicas, danças e comidas típicas.";
        break;

      case "Bolivia":
        descricao =
          "A Bolívia possui paisagens naturais impressionantes, como o Salar de Uyuni, além de uma cultura fortemente ligada às tradições indígenas e à história andina.";
        break;

      case "Peru":
        descricao =
          "O Peru é conhecido mundialmente por Machu Picchu, pela culinária peruana e pela herança do Império Inca. É um dos destinos turísticos mais visitados da América do Sul.";
        break;

      case "Colombia":
        descricao =
          "A Colômbia é conhecida por suas cidades coloridas, produção de café, música latina e paisagens tropicais que atraem turistas do mundo inteiro.";
        break;

      case "Uruguay":
        descricao =
          "O Uruguai é famoso por suas praias, pela tranquilidade das cidades e pela forte cultura do mate e do futebol.";
        break;

      case "South Korea":
        descricao =
          "A Coreia do Sul é conhecida pela tecnologia avançada, pelo K-pop, pelos dramas coreanos e pela culinária típica, como o kimchi.";
        break;

      case "Mexico":
        descricao =
          "O México possui uma cultura rica, ruínas históricas, comidas famosas como tacos e uma das celebrações culturais mais conhecidas: o Dia dos Mortos.";
        break;

      case "Venezuela":
        descricao =
          "A Venezuela possui belas paisagens naturais, incluindo praias e montanhas, além do Salto Ángel, a maior cachoeira do mundo.";
        break;

      case "Paraguay":
        descricao =
          "O Paraguai é conhecido pela cultura guarani, pela música tradicional e pela forte influência histórica na América do Sul.";
        break;

      case "Ecuador":
        descricao =
          "O Equador chama atenção pelas Ilhas Galápagos, pela biodiversidade e pelas paisagens naturais impressionantes.";
        break;

      case "Costa Rica":
        descricao =
          "A Costa Rica é famosa pelo ecoturismo, pelas florestas tropicais e pela preservação da natureza.";
        break;

      case "Spain":
        descricao =
          "A Espanha é conhecida pelo flamenco, pela arquitetura histórica, pelos estádios de futebol e pela culinária mediterrânea.";
        break;

      case "Guatemala":
        descricao =
          "A Guatemala possui uma rica herança maia, vulcões impressionantes e cidades históricas muito visitadas.";
        break;

      case "Honduras":
        descricao =
          "Honduras é conhecida por suas praias caribenhas, recifes de coral e cultura tradicional centro-americana.";
        break;

      case "Nicaragua":
        descricao =
          "A Nicarágua possui vulcões, lagos e cidades coloniais históricas que fazem parte da identidade do país.";
        break;

      case "Panama":
        descricao =
          "O Panamá é mundialmente conhecido pelo Canal do Panamá, uma das obras de engenharia mais importantes do mundo.";
        break;

      case "El Salvador":
        descricao =
          "El Salvador possui belas praias, vulcões e uma cultura marcada pela história e tradições locais.";
        break;

      case "Puerto Rico":
        descricao =
          "Porto Rico é conhecido por suas praias tropicais, música latina e cidades históricas coloridas.";
        break;

      case "Cuba":
        descricao =
          "Cuba é famosa pelos carros antigos, pela música cubana, pela arquitetura histórica e pelas praias paradisíacas.";
        break;

      default:
        descricao =
          "Este país possui uma cultura rica e diversas características interessantes.";
    }

    loading.textContent = "";

    detalhes.innerHTML = `

      <div class="card shadow-lg border-0 p-5 rounded-4">

        <div class="text-center">

          <img
            src="${pais.flags.svg}"
            class="img-fluid mb-4 shadow"
            style="
              width:380px;
              height:220px;
              object-fit:cover;
              border-radius:20px;
            "
          >

          <h1 class="mb-3">

            ${pais.name.common}

          </h1>

        </div>

        <div class="row mt-5 g-4">

          <div class="col-md-6">

            <div class="bg-light p-4 rounded-4 h-100">

              <h3> Capital</h3>

              <p class="mt-3">

                ${capital}

              </p>

            </div>

          </div>

          <div class="col-md-6">

            <div class="bg-light p-4 rounded-4 h-100">

              <h3> População</h3>

              <p class="mt-3">

                ${populacao} habitantes

              </p>

            </div>

          </div>

          <div class="col-md-6">

            <div class="bg-light p-4 rounded-4 h-100">

              <h3> Moeda Oficial</h3>

              <p class="mt-3">

                ${moeda}

              </p>

            </div>

          </div>

          <div class="col-md-6">

            <div class="bg-light p-4 rounded-4 h-100">

              <h3> Idiomas</h3>

              <p class="mt-3">

                ${idiomas}

              </p>

            </div>

          </div>

          <div class="col-12">

            <div class="bg-light p-4 rounded-4">

              <h3> Sobre o país</h3>

              <p class="mt-3">

                ${descricao}

              </p>

            </div>

          </div>

        </div>

      </div>

    `;

  } catch (erroCatch) {

    loading.textContent = "";

    erro.textContent =
      "Erro ao carregar detalhes do país.";

    console.error(erroCatch);

  }

}

carregarDetalhes();