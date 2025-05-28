document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formSuprimento');
  const nomeInput = document.getElementById('nomeItem');
  const grupoSelect = document.getElementById('grupoItem');
  const suprimentosList = document.getElementById('suprimentosList');

  // Estrutura: { grupo: [ { nome: 'item1' }, ... ] }
  let suprimentos = JSON.parse(localStorage.getItem('suprimentos')) || {
    Medicamentos: [],
    Comida: [],
    Bebidas: [],
    "Itens Importantes": [],
    "Itens de Laser": [],
    Diversos: [],
  };

  function salvarSuprimentos() {
    localStorage.setItem('suprimentos', JSON.stringify(suprimentos));
  }

  function criarItemElement(grupo, index) {
    const item = suprimentos[grupo][index];
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = item.nome;

    const btnRemover = document.createElement('button');
    btnRemover.className = 'btn btn-sm btn-danger';
    btnRemover.textContent = 'X';
    btnRemover.addEventListener('click', () => {
      suprimentos[grupo].splice(index, 1);
      salvarSuprimentos();
      renderizarSuprimentos();
    });

    li.appendChild(btnRemover);
    return li;
  }

  function renderizarSuprimentos() {
    suprimentosList.innerHTML = '';
    for (const grupo in suprimentos) {
      const grupoDiv = document.createElement('div');
      grupoDiv.className = 'mb-4';

      const titulo = document.createElement('h4');
      titulo.textContent = grupo;
      grupoDiv.appendChild(titulo);

      if (suprimentos[grupo].length === 0) {
        const vazio = document.createElement('p');
        vazio.className = 'text-muted';
        vazio.textContent = 'Nenhum item cadastrado.';
        grupoDiv.appendChild(vazio);
      } else {
        const ul = document.createElement('ul');
        ul.className = 'list-group';
        suprimentos[grupo].forEach((_, index) => {
          ul.appendChild(criarItemElement(grupo, index));
        });
        grupoDiv.appendChild(ul);
      }

      suprimentosList.appendChild(grupoDiv);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const grupo = grupoSelect.value;

    if (!nome || !grupo) return;

    suprimentos[grupo].push({ nome });
    salvarSuprimentos();
    renderizarSuprimentos();

    nomeInput.value = '';
    grupoSelect.value = '';
  });

  renderizarSuprimentos();
});
