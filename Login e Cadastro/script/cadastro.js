// ===== Função para Verificação do Nome Inserido =====

function isNameBlank(name) {
    const errorAlert = document.querySelector("#nameError");

    if (name === ""){
        errorAlert.innerText = "Esse campo é obrigatório!";
        return true;
    }

    errorAlert.innerText = "";
    return false;
}

// ===== Funções para Verificação do E-mail Inserido =====

function isEmailBlank(email) {
    const errorAlert = document.querySelector("#emailError");

    if (email === ""){
        errorAlert.innerText = "Esse campo é obrigatório!";
        return true;
    }

    errorAlert.innerText = "";
    return false;
}

function isEmailInvalid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorAlert = document.querySelector("#emailError");

    if (!regex.test(email)){
        errorAlert.innerText = "O e-mail digitado é inválido!";
        return true;
    }

    errorAlert.innerText = "";
    return false;
}

function emailHasProblems(email) {
    if (isEmailBlank(email) || isEmailInvalid(email)){
        return true;
    }
    return false;
}

// ===== Funções para Verificação da Senha Inserido =====

function isPasswordBlank(password) {
    const errorAlert = document.querySelector("#passwordError");

    if (password === ""){
        errorAlert.innerText = "Esse campo é obrigatório!";
        return true;
    }

    errorAlert.innerText = "";
    return false;
}

function isPasswordRepeatBlank(passwordRepeated) {
    const errorAlert = document.querySelector("#passwordRepeatError");

    if (passwordRepeated === ""){
        errorAlert.innerText = "Esse campo é obrigatório!";
        return true;
    }

    errorAlert.innerText = "";
    return false;
}

function isPasswordRepeatedDifferent(password, passwordRepeated) {
    const errorAlert = document.querySelector("#passwordRepeatError");

    if (password != passwordRepeated){
        errorAlert.innerText = "As senhas não conferem!";
        return true;
    }

    errorAlert.innerText = "";
    return false;
}

function passwordHasProblems(password, passwordRepeated) {
    if (isPasswordBlank(password) || isPasswordRepeatBlank(passwordRepeated) || isPasswordRepeatedDifferent(password, passwordRepeated)){
        return true;
    }
    return false;
}

// ===== Função para Tentativa de Cadastro =====

function userSaved(name, email, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let emailExists = users.find(u => u.email === email);

    if (emailExists) {
        Swal.fire({
            icon: "error",
            title: "Erro no cadastro!",
            text: "E-mail digitado já está em uso!",
            color: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#e4e3e3" : "#2e2e2e",
            background: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#2e2e2e" : "#e4e3e3",
            confirmButtonColor: "#d33"
        });
        return false;
    }

    users.push({name, email, password});
    localStorage.setItem("users", JSON.stringify(users));
    return true;
}

function register() {
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim().toLowerCase();
    const password = document.querySelector("#password").value.trim();
    const passwordRepeated = document.querySelector("#passwordRepeat").value.trim();

    if (isNameBlank(name) || emailHasProblems(email) || passwordHasProblems(password, passwordRepeated)){
        return;
    }

    if (!userSaved(name, email, password)) {
        return;
    }

    window.location.href = "login.html";
}
