const tarefaInput = document.getElementById("text-input");
const tarefaSecao = document.querySelector('.tasks');

tarefaInput.addEventListener("keyup", (e) => {
if (e.key == "Enter") {criarTarefa(); }});

function obterData() {
    const data = new Date();
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });
}

function criarTarefa() {
    const data = document.getElementById("date-input").value;
    const hora = document.getElementById("time-input").value;
    const texto = document.getElementById("text-input").value.trim();

    if(data === "" || hora === "" || texto === ""){
        alert("Um dos campos da tarefa está vazio. Insira os campos corretamente e tente novamente.");
        return;
    }

    tarefaSecao.innerHTML +=
    `<div class="task">
    <label id="taskname">
    <input onclick="atualizarTarefa(this)" type="checkbox" id="check-task">
    <p>${data} (${hora}) - <span id="text">${texto}</span></p>
    </label>
    <div class="delete">
    <i class="uil uil-trash">
    </i>
    </div>
    </div>`;
    var TarefasAtuais = document.querySelectorAll(".delete");
    for (var i = 0; i < TarefasAtuais.length; i++) {
        TarefasAtuais[i].onclick = function () {
            const tarefa = this.parentNode;
            const separador = tarefa.nextElementSibling;
            tarefa.remove();
            if (separador && separador.tagName == "HR"){
                separador.remove();
            }
        }
    }
    tarefaSecao.offsetHeight >= 300 ?
    tarefaSecao.classList.add("overflow") :
    tarefaSecao.classList.remove("overflow");

    document.getElementById("date-input").value = '';
    document.getElementById("time-input").value = '';
    document.getElementById("text-input").value = '';
}

function atualizarTarefa(task) {
    let itemTarefa = task.parentElement.lastElementChild;
    if (task.checked) {
        itemTarefa.classList.add("checked");
    }
    else {
        itemTarefa.classList.remove("checked");
    }
}

new Sortable(document.querySelector('.tasks'), {
    animation: 150,
    ghostClass: 'ghost',
});