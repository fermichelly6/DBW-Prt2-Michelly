const container = document.querySelector("#paises");
const loading = document.querySelector("#loading");
const erro = document.querySelector("#erro");

async function carregarPaises() {

  try {

    loading.textContent = "Carregando países...";
    erro.textContent = "";

    const resposta = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags"
    );

    if (!resposta.ok) {
      throw new Error("Erro na API");
    }

    const dados = await resposta.json();

    loading.textContent = "";

    let html = "";

    const paisesDesejados = [
      "Argentina",
      "Bolivia",
      "Peru",
      "Colombia",
      "Uruguay",
      "Brazil",
      "South Korea",
      "Mexico",
      "Venezuela",
      "Paraguay",
      "Ecuador",
      "Costa Rica",
      "Spain",
      "Guatemala",
      "Honduras",
      "Nicaragua",
      "Panama",
      "El Salvador",
      "Puerto Rico",
      "Cuba"
    ];

    const lista = paisesDesejados.map((nome) =>
      dados.find(
        (pais) =>
          pais.name.common === nome
      )
    );

    lista.forEach((pais, index) => {

      html += `

        <div class="col-md-3 mb-4">

          <div
            class="card pais-card shadow border-0 h-100"
            data-index="${index}"
          >

            <img
              src="${pais.flags.svg}"
              class="card-img-top"
              style="
                height:220px;
                object-fit:cover;
              "
            >

            <div class="card-body text-center">

              <h4 class="fw-bold">

                ${pais.name.common}

              </h4>

            </div>

          </div>

        </div>

      `;

    });

    container.innerHTML = html;

    const cards =
      document.querySelectorAll(".pais-card");

    cards.forEach((card) => {

      card.addEventListener("click", () => {

        const index =
          card.dataset.index;

        const pais =
          lista[index];

        window.location.href =
          `detalhes.html?nome=${pais.name.common}`;

      });

    });

  } catch (erroCatch) {

    loading.textContent = "";

    erro.textContent =
      "Erro ao carregar países.";

    console.error(erroCatch);

  }

}

carregarPaises();