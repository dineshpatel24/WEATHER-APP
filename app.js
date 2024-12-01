const apiKey = '920f316d4cf208c077b36c96d16d2e8a'; // Secure this in production!

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const weatherResult = document.getElementById('weatherResult');

    if (!city) {
        weatherResult.innerHTML = '<p class="error">Please enter a city name.</p>';
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherResult.innerHTML = `
            <h2>Weather in ${city}</h2>
            <img src="${icon}" alt="${description}" class="weather-icon">
            <p class="temperature">${temperature}°C</p>
            <p class="description">${description}</p>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherResult.innerHTML = '<p class="error">Failed to retrieve weather data. Please try again later.</p>';
    }
}
