"use strict";
const p = document.querySelector("p");
const button = document.querySelector("button");

let latitude;
let longitude;
let city;

const weather = () => {
  p.textContent = "Loading...";
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=80f0df8068e557573579c2c83e4b9084&units=metric`
  );
  weatherApi
    .then((res) => res.json())
    .then((data) => {
      const temp = Math.round(data.main.temp);
      const description = data.weather[0].description;
      p.innerHTML = `Now in the city ${city}: ${temp}°C, ${description}`;
    })
    .catch((error) => {
      p.textContent = `Something went wrong, ${error}`;
    });
};

fetch("https://ipapi.co/json/")
  .then((response) => response.json())
  .then((data) => {
    if (data && data.latitude && data.longitude && data.city) {
      latitude = data.latitude;
      longitude = data.longitude;
      city = data.city;
      weather();
    } else {
      console.error("Не удалось получить координаты из IP.");
    }
  })
  .catch((error) => {
    console.error("Ошибка при получении геолокации по IP:", error);
  });

button.addEventListener("click", weather);
