document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formAtividade');
    const lista = document.getElementById('listaAtividades');

    let atividades = JSON.parse(localStorage.getItem('atividades')) || [];

    function renderAtividades() {
        lista.innerHTML = '';
        atividades.forEach((atividade, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item bg-secondary text-light mb-2';
            li.innerHTML = `<strong>${atividade.descricao}</strong> - Responsável: ${atividade.responsavel}, Prazo: ${atividade.prazo}`;

            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.className = 'btn btn-sm btn-danger float-end';
            btnRemover.onclick = function () {
                atividades.splice(index, 1);
                localStorage.setItem('atividades', JSON.stringify(atividades));
                renderAtividades();
            };

            li.appendChild(btnRemover);
            lista.appendChild(li);
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const responsavel = document.getElementById('responsavel').value;
        const prazo = document.getElementById('prazo').value;

        atividades.push({ descricao, responsavel, prazo });
        localStorage.setItem('atividades', JSON.stringify(atividades));
        renderAtividades();

        form.reset();
    });

    renderAtividades();
});
