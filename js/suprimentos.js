document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formSuprimento');
    const lista = document.getElementById('listaSuprimentos');

    let suprimentos = JSON.parse(localStorage.getItem('suprimentos')) || [];

    function renderSuprimentos() {
        lista.innerHTML = '';
        suprimentos.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item bg-secondary text-light mb-2';
            li.innerHTML = `<strong>${item.nome}</strong> - ${item.categoria}, Qtd: ${item.quantidade}` + 
                (item.validade ? `, Validade: ${item.validade}` : '');

            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.className = 'btn btn-sm btn-danger float-end';
            btnRemover.onclick = function () {
                suprimentos.splice(index, 1);
                localStorage.setItem('suprimentos', JSON.stringify(suprimentos));
                renderSuprimentos();
            };

            li.appendChild(btnRemover);
            lista.appendChild(li);
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const categoria = document.getElementById('categoria').value;
        const nome = document.getElementById('nome').value;
        const quantidade = document.getElementById('quantidade').value;
        const validade = document.getElementById('validade').value;

        suprimentos.push({ categoria, nome, quantidade, validade });
        localStorage.setItem('suprimentos', JSON.stringify(suprimentos));
        renderSuprimentos();

        form.reset();
    });

    renderSuprimentos();
});
