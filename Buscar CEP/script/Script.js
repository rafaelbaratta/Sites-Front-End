function verificarEnter(event) {
    if (event.key === "Enter") {
        mascaraCep();
        buscarCep();
    }
}

function mascaraCep() {
    const cepInput = document.getElementById('cep');
    let cep = cepInput.value.replace(/\D/g, '');

    if (cep.length === 8) {
        cepInput.value = cep.replace(/^(\d{2})(\d{3})(\d{3}).*/, '$1.$2-$3');
    }

}

function buscarCep() {
    let cep = document.getElementById("cep").value;
    cep = cep.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert("CEP inválido! Digite apenas 8 números");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(response => response.json()).then(data => {
        if (data.erro) {
            alert("CEP não encontrado!");
            return;
        }

        document.getElementById("logradouro").value = data.logradouro || "";
        document.getElementById("bairro").value = data.bairro || "";
        document.getElementById("cidade").value = data.localidade || "";
        document.getElementById("estado").value = data.estado || "";
        document.getElementById("uf").value = data.uf || "";

        document.getElementById("logradouro").disabled = false;
        document.getElementById("bairro").disabled = false;
        document.getElementById("cidade").disabled = false;
        document.getElementById("estado").disabled = false;
        document.getElementById("uf").disabled = false;

    }).catch(error => {
        alert("Erro ao encontrar o CEP!");
        return;
    })
}
