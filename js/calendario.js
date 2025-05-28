document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formEvento');
    const lista = document.getElementById('listaEventos');

    let eventos = JSON.parse(localStorage.getItem('eventos')) || [];

    function renderEventos() {
        lista.innerHTML = '';
        eventos.forEach((evento, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item bg-secondary text-light mb-2';
            li.textContent = `${evento.data} - ${evento.descricao}`;
            
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.className = 'btn btn-sm btn-danger float-end';
            btnRemover.onclick = function () {
                eventos.splice(index, 1);
                localStorage.setItem('eventos', JSON.stringify(eventos));
                renderEventos();
            };
            
            li.appendChild(btnRemover);
            lista.appendChild(li);
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = document.getElementById('data').value;
        const descricao = document.getElementById('descricao').value;

        eventos.push({ data, descricao });
        localStorage.setItem('eventos', JSON.stringify(eventos));
        renderEventos();

        form.reset();
    });

    renderEventos();
});
