const API_KEY = 'bd5e378503939dec125e11ad2ba8ac2a'; // Chave gratuita para teste (OpenWeatherMap)

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const geoBtn = document.getElementById('geo-btn');

const cityEl = document.getElementById('city');
const descEl = document.getElementById('description');
const tempEl = document.getElementById('temp');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${API_KEY}`);
        const data = await response.json();
        if (data.cod === "404") throw new Error("Cidade não encontrada");
        updateUI(data);
    } catch (err) {
        alert(err.message);
    }
}

async function getWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`);
        const data = await response.json();
        updateUI(data);
    } catch (err) {
        alert("Erro ao buscar localização");
    }
}

function updateUI(data) {
    cityEl.textContent = `${data.name}, ${data.sys.country}`;
    descEl.textContent = data.weather[0].description;
    tempEl.textContent = Math.round(data.main.temp);
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${Math.round(data.wind.speed * 3.6)}km/h`;
}

searchBtn.addEventListener('click', () => {
    if (cityInput.value) getWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && cityInput.value) getWeather(cityInput.value);
});

geoBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
            () => alert("Permissão de localização negada")
        );
    }
});

// Inicializar com uma cidade padrão
getWeather('São Paulo');