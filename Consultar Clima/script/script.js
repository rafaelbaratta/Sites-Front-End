const API_KEY = process.env.YOUR_API_KEY;

function verificarEnter(event) {
    if (event.key === "Enter") {
        loadData();
    }
}

function capitalizeWords(text) {
    return text.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function loadData(event) {
    event.preventDefault();
    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Digite o nome de uma cidade!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`).then(response => response.json()).then(data => {
        if (data.cod == "404") {
            alert("Cidade não encontrada!\nVerifique se o nome foi digitado corretamente!");
            return;
        }

        document.getElementById("weather").textContent = capitalizeWords(data.weather[0].description) || "";
        document.getElementById("weather-image").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weather-image").alt = "Ícone de " + document.getElementById("weather").textContent;

        document.getElementById("temperature").textContent = (data.main.temp + "°C") || "";
        document.getElementById("feelslike").textContent = (data.main.feels_like + "°C") || "";

        document.getElementById("min").textContent = (data.main.temp_min + "°C") || "";
        document.getElementById("max").textContent = (data.main.temp_max + "°C") || "";

        document.getElementById("wind-speed").textContent = (data.wind.speed + "m/s") || "";
        document.getElementById("wind-deg").textContent = (data.wind.deg + "°") || "";

        document.getElementById("humidity").textContent = (data.main.humidity + "%") || "";
        document.getElementById("clouds").textContent = (data.clouds.all + "%") || "";

        document.getElementById("information").classList.remove("invisible");

    }).catch(error => {
        alert("Erro ao encontrar os dados");
        return;
    })
}
