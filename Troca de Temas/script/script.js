document.addEventListener('DOMContentLoaded', function() {
    const botao = document.querySelector('.botao');
    const banner = document.querySelector('.banner');

    const lampada = document.getElementById('lampada');
    const tema = document.getElementById('tema');
    const icone = document.getElementById('icone');

    const body = document.body;

    botao.addEventListener('click', function() {

        if (body.classList.contains("light-theme")){
            body.classList.replace("light-theme", "dark-theme");
            botao.textContent = "Tema claro";
            lampada.src = "assets/tema_escuro.png";
            banner.src = "assets/banner_escuro.jpg";
            tema.textContent = "Tema atual: Escuro";
            icone.href = "assets/tema_escuro.png";

        } else {
            body.classList.replace("dark-theme", "light-theme");
            botao.textContent = "Tema escuro";
            lampada.src = "assets/tema_claro.png";
            banner.src = "assets/banner_claro.jpg";
            tema.textContent = "Tema atual: Claro";
            icone.href = "assets/tema_claro.png";
        }
    });
});
