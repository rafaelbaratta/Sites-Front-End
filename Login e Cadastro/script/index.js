// Funções para Adicionar as Informações do Usuário

window.onload = function() {
    loadData();
    
}

function loadData() {
    const nameUser = document.getElementById("name");
    const emailUser = document.getElementById("email");
    const passwordUser = document.getElementById("password");

    const title1 = document.getElementById("title-h1");
    const title2 = document.getElementById("title-h2");
    const button = document.getElementById("button-return");

    let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (currentUser) {
        nameUser.value = currentUser.name;
        emailUser.value = currentUser.email;
        passwordUser.value = currentUser.password;

        title1.innerText = "Bem-Vindo!"
        title2.innerText = "Você está logado em nosso site";
        button.innerText = "Sair";

        return;
    }

    nameUser.parentNode.classList.add("invisible");
    emailUser.parentNode.classList.add("invisible");
    passwordUser.parentNode.classList.add("invisible");

    title1.innerText = "Ops!"
    title2.innerText = "Você precisa fazer login para continuar";
    button.innerText = "Fazer login";
}

function logoff() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
