document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formColaborador');
    const lista = document.getElementById('listaColaboradores');

    let colaboradores = JSON.parse(localStorage.getItem('colaboradores')) || [];

    function renderColaboradores() {
        lista.innerHTML = '';
        colaboradores.forEach((colab, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item bg-secondary text-light mb-2';
            li.innerHTML = `<strong>${colab.nome}</strong> - ${colab.idade} anos, ${colab.habilidade} (${colab.sexo})`;

            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.className = 'btn btn-sm btn-danger float-end';
            btnRemover.onclick = function () {
                colaboradores.splice(index, 1);
                localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
                renderColaboradores();
            };

            li.appendChild(btnRemover);
            lista.appendChild(li);
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const habilidade = document.getElementById('habilidade').value;
        const sexo = document.getElementById('sexo').value;

        colaboradores.push({ nome, idade, habilidade, sexo });
        localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
        renderColaboradores();

        form.reset();
    });

    renderColaboradores();
});
