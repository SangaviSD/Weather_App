const apiKey = "bbbc615fa1ec453e97453453250312";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const theme = document.getElementById("theme");

async function getWeather(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    const response = await fetch(url);
    const data = await response.json();


    if (data.error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";

        if (data.current.is_day === 1) {
        theme.classList.remove("night");
        theme.classList.add("day");
    } else {
        theme.classList.remove("day");
        theme.classList.add("night");
    }

    const condition = data.current.condition.text.toLowerCase();

    if (condition.includes("cloud"))     weatherIcon.src = "images/clouds.png";
    else if (condition.includes("sun") || condition.includes("clear")) weatherIcon.src = "images/clear.png";
    else if (condition.includes("rain")) weatherIcon.src = "images/rain.png";
    else if (condition.includes("snow")) weatherIcon.src = "images/snow.png";
    else if (condition.includes("fog"))  weatherIcon.src = "images/fog.png";
    else if (condition.includes("mist")) weatherIcon.src = "images/mist.png";
    else if (condition.includes("thunder")) weatherIcon.src = "images/thunder.png";
    else weatherIcon.src = "images/default.png";

    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + "Km/h";

    document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
    getWeather(searchBox.value.trim());
});
