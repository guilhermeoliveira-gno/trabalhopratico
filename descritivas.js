// Pega o ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Agora busca no JSON de descrição
fetch('descritiva.json')  
  .then(response => response.json())
  .then(dados => {
    const lugar = dados.lugares.find(item => item.id == id);

    if (lugar) {
      // Atualiza a imagem principal
      const imgLugar = document.getElementById('imgitalia');
      imgLugar.src = lugar.imagem_detalhe;
      imgLugar.alt = lugar.titulo;

      // Atualiza o título
      const titulo = document.querySelector('h3');
      titulo.innerText = lugar.titulo;

      // Atualiza o card final com subtitulo e descrição detalhada
      const cardTitulo = document.querySelector('.card-title');
      const cardTexto = document.querySelector('.card-text');
      cardTitulo.innerText = lugar.subtitulo;
      cardTexto.innerText = lugar.descricao_detalhada;

      // Atualiza o Acordeão (Accordion) dos pontos turísticos
      const gerais = document.getElementById('gerais');
      const accordionHTML = `
        <div class="accordion" id="accordionPanelsStayOpenExample">
          ${lugar.pontos_turisticos.map((ponto, index) => `
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${index}" aria-expanded="${index === 0}" aria-controls="panelsStayOpen-collapse${index}">
                  ${ponto.nome}
                </button>
              </h2>
              <div id="panelsStayOpen-collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}">
                <div class="accordion-body">
                  ${ponto.descricao}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      // Substitui o acordeão atual
      gerais.querySelector('div:nth-child(2)').innerHTML = accordionHTML;
    }
  })
  .catch(error => console.error('Erro ao carregar os detalhes:', error));
