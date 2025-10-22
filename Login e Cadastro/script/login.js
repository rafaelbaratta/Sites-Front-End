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

function passwordHasProblems(password) {
    if (isPasswordBlank(password)){
        return true;
    }
    return false;
}

// ===== Funções para Lembrar E-mail e Senha =====

window.onload = function() {
    const savedEmail = JSON.parse(localStorage.getItem("email"));
    const savedPassword = JSON.parse(localStorage.getItem("password"));
    const rememberMe = JSON.parse(localStorage.getItem("rememberMe") === "true");

    if (rememberMe && savedEmail && savedPassword) {
        document.getElementById("email").value = savedEmail;
        document.getElementById("password").value = savedPassword;
        document.getElementById("rememberMe").checked = true;
    }
};

function rememberEmailPassword(rememberMe, email, password) {
    if (rememberMe) {
        localStorage.setItem("email", JSON.stringify(email));
        localStorage.setItem("password", JSON.stringify(password));
        localStorage.setItem("rememberMe", "true");
    } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
    }
}

// ===== Funções para Tentativa de Login =====

function userExists(email, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userValid = users.find(u => u.email === email && u.password == password);

    if (!userValid) {
        Swal.fire({
            icon: "error",
            title: "Erro no login!",
            text: "E-mail ou senha inválido!",
            color: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#e4e3e3" : "#2e2e2e",
            background: window.matchMedia("(prefers-color-scheme: dark)").matches ? "#2e2e2e" : "#e4e3e3",
            confirmButtonColor: "#d33"
        });
        return false;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(userValid));
    return true;
}

function login() {
    const rememberMe = document.querySelector("#rememberMe").checked;
    const email = document.querySelector("#email").value.trim().toLowerCase();
    const password = document.querySelector("#password").value.trim();

    rememberEmailPassword(rememberMe, email, password);

    if (emailHasProblems(email) || passwordHasProblems(password)){
        return;
    }

    if (!userExists(email, password)) {
        return;
    }

    window.location.href = "index.html";
}
