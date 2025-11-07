const rangeInput = document.getElementById("range-input");
const generateButton = document.getElementById("generate-button");
const copyButton = document.getElementById("copy-button");

window.onload = () => {
    rangeInput.dispatchEvent(new Event("input"));
};

rangeInput.addEventListener("input", () => {
    const value = rangeInput.value;
    const min = rangeInput.min ? rangeInput.min : 0;
    const max = rangeInput.max ? rangeInput.max : 50;

    const percentage = ((value - min) * 100) / (max - min);
    rangeInput.style.background = `linear-gradient(90deg, var(--color-pattern1) 0%, var(--color-pattern2) ${percentage}%, var(--background-2) ${percentage}%, var(--background-2) 100%)`;

    document.getElementById("length-display").textContent = value;
});

generateButton.addEventListener("click", () => {
    const length = rangeInput.value;
    const includeUppercase = document.getElementById("uppercase-letters").checked;
    const includeLowercase = document.getElementById("lowercase-letters").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;

    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
        alert("Por favor, selecione ao menos uma opção para gerar a senha.");
        return;
    }

    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);

    document.getElementById("password-generated").textContent = password;
});

copyButton.addEventListener("click", () => {
    const password = document.getElementById("password-generated").textContent;
    if (!password) {
        alert("Nenhuma senha gerada para copiar.");
        return;
    }
    navigator.clipboard.writeText(password).then(() => {
        alert("Senha copiada para a área de transferência!");
    }
    ).catch(() => {
        alert("Falha ao copiar a senha. Por favor, tente novamente.");
    });
});

function generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols) {
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const number = "0123456789";
    const symbol = "!@#$%^&*()_+~`´|}{[]:;?><,.\\/-=";

    let characters = [];

    characters = useUppercase ? characters.concat(uppercaseLetters.split("")) : characters;
    characters = useLowercase ? characters.concat(lowercaseLetters.split("")) : characters;
    characters = useNumbers ? characters.concat(number.split("")) : characters;
    characters = useSymbols ? characters.concat(symbol.split("")) : characters;

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}
