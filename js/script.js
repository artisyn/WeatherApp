'use strict';
import { APIKEY } from './settings.js';
const dateDisplay = document.querySelector('.userInfo__date');
const burgerMenu = document.querySelector('.burgerInput');
const searchForm = document.querySelector('.searchForm');
const btnSearch = document.querySelector('.btnSearch');
const searchBar = document.querySelector('.searchBar');
const weatherInfo = document.querySelector('.weatherInfo');
const townInfo = document.querySelector('.town');
const dateTimeInfo = document.querySelector('.time');
const weatherIcon = document.querySelector('.weatherIcon');

// time offset function
const offsetDate = (offset) => {
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const date = new Date(new Date().getTime() + offset * 1000);
  const hrs = date.getUTCHours();
  const mins = date.getUTCMinutes();
  // const secs = date.getUTCSeconds();
  const day = weekDays[date.getUTCDay()];

  return { weekday: day, hours: hrs, minutes: mins };
};

// rendering html
const updateHtml = (apiData, dateObj) => {
  const weather = apiData.weather[0].description;
  const city = apiData.name;
  // icon
  const iconUrl = `http://openweathermap.org/img/wn/${apiData.weather[0].icon}.png`;

  // updating UI
  weatherInfo.innerHTML = `${
    weather.split(' ').length > 1
      ? weather
          .split(' ')
          .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
          .join(' <br /> ')
      : weather.charAt(0).toUpperCase() + el.slice(1)
  }`;
  townInfo.innerHTML = `${city}`;
  dateTimeInfo.innerHTML =
    `${dateObj.weekday} ` +
    `${+dateObj.hours}`.padStart(2, 0) +
    ' : ' +
    `${+dateObj.minutes}`.padStart(2, 0);
  weatherIcon.style.backgroundImage = `url('${iconUrl}')`;
};

// Burger menu functionality

burgerMenu.addEventListener('click', (e) => {
  if (e.target.checked) {
    searchForm.classList.remove('noOpacity');
  }
  if (!e.target.checked) {
    searchForm.classList.add('noOpacity');
  }
});
///// el.style.pointerEvents = none;

// api test
const getWeatherData = async (apiKey, cityName) => {
  try {
    const weatherPromise = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    );
    if (!weatherPromise.ok)
      throw new Error('Bad URL, please type again ❌❌❌');
    const weatherData = await weatherPromise.json();
    console.log(weatherData);
    const dateObj = offsetDate(weatherData.timezone);
    console.log(dateObj);
    updateHtml(weatherData, dateObj);
    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

btnSearch.addEventListener('click', (e) => {
  e.preventDefault();
  const userInput = searchBar.value; // maybe to lowerCasee?

  getWeatherData(APIKEY, userInput);
});

// TODO Implement degrees range, create css or svg icons
