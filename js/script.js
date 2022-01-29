'use strict';
const APIKEY = '';
const CITY = 'Vilnius';
const dateDisplay = document.querySelector('.userInfo__date');

// api test
const getWeatherData = async (apiKey, cityName) => {
  try {
    const weatherPromise = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    );
    if (!weatherPromise.ok)
      throw new Error('Bad URL, please type again ❌❌❌');
    console.log(weatherPromise);
    const weatherData = await weatherPromise.json();
    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

getWeatherData(APIKEY, 'london').then((data) => console.log(data));

const showDateAndTime = () => {
  setInterval(() => {
    let today = new Intl.DateTimeFormat('lt', {
      timeStyle: 'medium',
      dateStyle: 'long', //short, long
    }).format(Date.now());

    dateDisplay.innerText = today;
  }, 1000);
};
let dateTimeout = showDateAndTime();
