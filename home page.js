// Exemplo de como carregar o JSON dinamicamente
fetch('homepage.json')  
  .then(response => response.json())
  .then(dados => {
    
    console.log(dados.lugares); // Exibe no console para testar

    // Exemplo: gerar os cards na página principal
    const container = document.getElementById('itenscard');

    dados.lugares.forEach(lugar => {
      const card = `
        <div class="card" style="width: 18rem; margin:10px;">
          <a href="descritiva.html?id=${lugar.id}">
            <img src="${lugar.imagem_principal}" class="card-img-top" alt="${lugar.titulo}">
          </a>
          <div class="card-body">
            <h5 class="card-title">${lugar.titulo}</h5>
            <p class="card-text">${lugar.descricao}</p>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });
  })
  .catch(error => console.error('Erro ao carregar JSON:', error));
