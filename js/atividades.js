document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formAtividade');
  const nomeInput = document.getElementById('nomeAtividade');
  const descricaoInput = document.getElementById('descricaoAtividade');
  const colaboradoresContainer = document.getElementById('colaboradoresCheckboxes');
  const atividadesList = document.getElementById('atividadesList');

  // Buscar colaboradores do localStorage
  // Estrutura esperada: array de objetos { nome, idade, habilidade, sexo }
  let colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];
  let atividades = JSON.parse(localStorage.getItem('atividades')) || [];

  function salvarAtividades() {
    localStorage.setItem('atividades', JSON.stringify(atividades));
  }

  // Renderiza checkboxes dos colaboradores
  function renderColaboradoresCheckboxes() {
    colaboradoresContainer.innerHTML = '';
    if (colaboradores.length === 0) {
      colaboradoresContainer.textContent = 'Nenhum colaborador cadastrado.';
      return;
    }
    colaboradores.forEach((colab, i) => {
      const div = document.createElement('div');
      div.className = 'form-check';

      const input = document.createElement('input');
      input.className = 'form-check-input';
      input.type = 'checkbox';
      input.id = `colabCheckbox${i}`;
      input.value = colab.nome;

      const label = document.createElement('label');
      label.className = 'form-check-label';
      label.setAttribute('for', `colabCheckbox${i}`);
      label.textContent = colab.nome;

      div.appendChild(input);
      div.appendChild(label);
      colaboradoresContainer.appendChild(div);
    });
  }

  // Renderiza lista de atividades
  function renderAtividades() {
    atividadesList.innerHTML = '';
    if (atividades.length === 0) {
      atividadesList.innerHTML = '<p class="text-muted">Nenhuma atividade cadastrada.</p>';
      return;
    }

    atividades.forEach((atividade, index) => {
      const card = document.createElement('div');
      card.className = 'card mb-3 bg-secondary text-light';

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      const titulo = document.createElement('h5');
      titulo.className = 'card-title';
      titulo.textContent = atividade.nome;

      const responsaveis = document.createElement('p');
      responsaveis.className = 'card-text mb-1';
      responsaveis.innerHTML = `<strong>Responsável(s):</strong> ${atividade.responsaveis.join(', ')}`;

      cardBody.appendChild(titulo);
      cardBody.appendChild(responsaveis);

      if (atividade.descricao && atividade.descricao.trim() !== '') {
        const desc = document.createElement('p');
        desc.className = 'card-text';
        desc.textContent = atividade.descricao;
        cardBody.appendChild(desc);
      }

      const btnRemover = document.createElement('button');
      btnRemover.className = 'btn btn-sm btn-danger';
      btnRemover.textContent = 'Remover';
      btnRemover.addEventListener('click', () => {
        atividades.splice(index, 1);
        salvarAtividades();
        renderAtividades();
      });

      cardBody.appendChild(btnRemover);
      card.appendChild(cardBody);
      atividadesList.appendChild(card);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const descricao = descricaoInput.value.trim();

    // Pegar colaboradores selecionados
    const checkboxes = colaboradoresContainer.querySelectorAll('input[type=checkbox]:checked');
    const responsaveis = Array.from(checkboxes).map(cb => cb.value);

    if (!nome || responsaveis.length === 0) {
      alert('Por favor, preencha o nome da atividade e selecione ao menos um responsável.');
      return;
    }

    atividades.push({ nome, responsaveis, descricao });
    salvarAtividades();
    renderAtividades();

    // Resetar form
    nomeInput.value = '';
    descricaoInput.value = '';
    colaboradoresContainer.querySelectorAll('input[type=checkbox]').forEach(cb => (cb.checked = false));
  });

  renderColaboradoresCheckboxes();
  renderAtividades();
});
