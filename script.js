const apiKey = "f3dca2567eaf71a804c9ef8f2956bc50";


const cityInput = document.getElementById("city");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const feels = document.getElementById("feels");
const weather = document.getElementById("weather");
const icon = document.getElementById("weatherIcon");
const result = document.getElementById("result");
const suggestionsBox = document.getElementById("suggestions");


async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    if (data.cod != 200) {
      alert(data.message);
      return;
    }

    // show result box
    result.style.display = "block";

   
    cityName.innerText = `${data.name}, ${data.sys.country}`;
    temperature.innerText = `🌡️ Temperature: ${data.main.temp} °C`;
    humidity.innerText = `💧 Humidity: ${data.main.humidity}%`;
    feels.innerText = `Feels like: ${data.main.feels_like} °C`;
    weather.innerText = `Condition: ${data.weather[0].main}`;

    const iconCode = data.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    
    changeBackground(data.weather[0].main);

  } catch (error) {
    console.log(error);
    alert("Network error or invalid API key");
  }
}



cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});



cityInput.addEventListener("input", async function () {
  const query = cityInput.value.trim();

  if (query.length < 2) {
    suggestionsBox.innerHTML = "";
    return;
  }

  const geoURL =
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

  try {
    const res = await fetch(geoURL);
    const data = await res.json();

    suggestionsBox.innerHTML = "";

    data.forEach(city => {
      const div = document.createElement("div");
      div.classList.add("suggestion");

      div.innerText = `${city.name}, ${city.country}`;

      div.onclick = function () {
        cityInput.value = city.name;
        suggestionsBox.innerHTML = "";
      };

      suggestionsBox.appendChild(div);
    });

  } catch (err) {
    console.log(err);
  }
});



function changeBackground(condition) {
  condition = condition.toLowerCase();

  if (condition.includes("rain")) {
    document.body.style.background =
      "linear-gradient(135deg,#3a506b,#5bc0be)";
  } 
  else if (condition.includes("cloud")) {
    document.body.style.background =
      "linear-gradient(135deg,#bdc3c7,#2c3e50)";
  } 
  else if (condition.includes("clear")) {
    document.body.style.background =
      "linear-gradient(135deg,#f6d365,#fda085)";
  } 
  else if (condition.includes("storm")) {
    document.body.style.background =
      "linear-gradient(135deg,#141e30,#243b55)";
  } 
  else {
    document.body.style.background =
      "linear-gradient(135deg,#74ebd5,#acb6e5)";
  }
}