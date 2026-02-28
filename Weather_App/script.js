document.addEventListener('DOMContentLoaded',()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const API_KEY= "OpenWeather API Key or any Weather API"
    getWeatherBtn.addEventListener('click', async()=>{
        const city= cityInput.value.trim()
        if(!city) return;
        try {
            const weatherData= await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
        }

    })

    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response= await fetch(url)
        if(!response.ok){
            throw new Error("City Not Found") // Though city not found is not needed here, we could just write throw new Error
        }
        const data= await response.json()
        return data

    }

    function displayWeatherData(weatherData){
        console.log(weatherData)
        const {name,main,weather}=weatherData
        cityNameDisplay.textContent=name
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
        //Unlock the display
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
    }

    function showError(){
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
})