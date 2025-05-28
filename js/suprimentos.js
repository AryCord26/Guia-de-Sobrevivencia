document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formSuprimento');
  const nomeInput = document.getElementById('nomeItem');
  const grupoSelect = document.getElementById('grupoItem');
  const quantidadeInput = document.getElementById('quantidadeItem');
  const descricaoInput = document.getElementById('descricaoItem');
  const suprimentosList = document.getElementById('suprimentosList');

  // Estrutura: { grupo: [ { nome, quantidade, descricao } ] }
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
    li.className = 'list-group-item d-flex flex-column';

    // Nome + quantidade na mesma linha
    const nomeQtdDiv = document.createElement('div');
    nomeQtdDiv.className = 'd-flex justify-content-between align-items-center';

    const nomeSpan = document.createElement('span');
    nomeSpan.textContent = item.nome;
    nomeSpan.style.fontWeight = '600';

    const qtdSpan = document.createElement('span');
    qtdSpan.className = 'quantidade-item';
    qtdSpan.textContent = `Qtd: ${item.quantidade}`;

    nomeQtdDiv.appendChild(nomeSpan);
    nomeQtdDiv.appendChild(qtdSpan);

    li.appendChild(nomeQtdDiv);

    // Descrição (se existir)
    if (item.descricao && item.descricao.trim() !== '') {
      const descP = document.createElement('p');
      descP.className = 'descricao-item';
      descP.textContent = item.descricao;
      li.appendChild(descP);
    }

    // Botão remover
    const btnRemover = document.createElement('button');
    btnRemover.className = 'btn btn-sm btn-danger align-self-end';
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
    const quantidade = parseInt(quantidadeInput.value, 10);
    const descricao = descricaoInput.value.trim();

    if (!nome || !grupo || !quantidade || quantidade < 1) return;

    suprimentos[grupo].push({ nome, quantidade, descricao });
    salvarSuprimentos();
    renderizarSuprimentos();

    nomeInput.value = '';
    grupoSelect.value = '';
    quantidadeInput.value = '1';
    descricaoInput.value = '';
  });

  renderizarSuprimentos();
});
