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
const funFactContainer = document.querySelector('.funFact');
const degreeDisplay = document.querySelector('.degree');
const degNumber = document.querySelector('.degNumber');
const degPointer = document.querySelector('.degPointer');

// random Joke api

const getRandomJoke = async () => {
  try {
    const jokePromise = await fetch('https://ffa.aakhilv.me/json');
    const joke = await jokePromise.json();
    funFactContainer.innerText = joke.text;
  } catch (err) {
    console.error(err);
  }
};

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

const displayDegreeRang = (deg) => {
  let x = (deg * 300) / 40;
  degreeDisplay.style.transform = `translateX(${x}%)`;
  // background change
  let bgColor = '';
  if (deg >= -40 && deg <= -20) bgColor = 'var(--degree--40--20)';
  if (deg >= -20 && deg <= 0) bgColor = 'var(--degree--20-0)';
  if (deg > 0 && deg <= 20) bgColor = 'var(--degree-0-20)';
  if (deg > 20 && deg <= 40) bgColor = 'var(--degree-20-40)';
  degNumber.innerHTML = `${deg}&deg;`;
  degNumber.style.color = bgColor;
  degPointer.style.backgroundColor = bgColor;
};
const updateIcon = (main) => {
  const weather = main.toLowerCase();
  console.log(weather);
  if (weather === 'clouds') return createClouds();
  if (weather === 'snow') return createCloudsAndSnow();
  if (weather === 'rain') return createCloudsAndRain();
  if (weather === 'drizzle') return createCloudsAndRain();
  if (weather === 'thunderstorm') return createCloudsRainAndThunder();
  if (weather === 'clear') return createSun();
  createClouds();
};

// rendering html
const updateHtml = (apiData, dateObj) => {
  console.log(apiData);
  const weather = apiData.weather[0].description;
  const main = apiData.weather[0].main;
  const city = apiData.name;
  const deg = Math.floor(apiData.main.temp);
  // display degree
  displayDegreeRang(deg);

  // icon logic
  updateIcon(main);

  // updating UI
  weatherInfo.innerHTML = `${
    weather.split(' ').length > 1
      ? weather
          .split(' ')
          .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
          .join(' <br /> ')
      : weather.charAt(0).toUpperCase() + weather.slice(1)
  }`;
  townInfo.innerHTML = `${city}`;
  dateTimeInfo.innerHTML =
    `${dateObj.weekday} ` +
    `${+dateObj.hours}`.padStart(2, 0) +
    ' : ' +
    `${+dateObj.minutes}`.padStart(2, 0);
  getRandomJoke();
};

const clearIconField = () => {
  weatherIcon.innerHTML = '';
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

    const dateObj = offsetDate(weatherData.timezone);

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

const createSun = () => {
  weatherIcon.innerHTML = '';
  const div1 = document.createElement('div');
  div1.classList.add('sun');
  weatherIcon.appendChild(div1);
};

// createSun();

const createClouds = () => {
  clearIconField();
  const div2 = document.createElement('div');
  div2.classList.add('cloudLeft');
  weatherIcon.appendChild(div2);
  const div3 = document.createElement('div');
  div3.classList.add('cloudRight');
  weatherIcon.appendChild(div3);
};
// createClouds();

const createSunAndClouds = () => {
  clearIconField();
  const div1 = document.createElement('div');
  div1.classList.add('sun');
  weatherIcon.appendChild(div1);
  const div2 = document.createElement('div');
  div2.classList.add('cloudLeft');
  weatherIcon.appendChild(div2);
  const div3 = document.createElement('div');
  div3.classList.add('cloudRight');
  weatherIcon.appendChild(div3);
};
// createSunAndClouds();

const createCloudsAndRain = () => {
  clearIconField();
  const div2 = document.createElement('div');
  div2.classList.add('cloudLeft');
  weatherIcon.appendChild(div2);
  const div3 = document.createElement('div');
  div3.classList.add('cloudRight');
  weatherIcon.appendChild(div3);
  for (let i = 0; i < 8; i++) {
    const div = document.createElement('div');
    div.classList.add(`rain${i + 1}`);
    weatherIcon.appendChild(div);
  }
};
// createCloudsAndRain();

const createCloudsRainAndThunder = () => {
  clearIconField();

  const div2 = document.createElement('div');
  div2.classList.add('cloudLeft');
  weatherIcon.appendChild(div2);
  const div3 = document.createElement('div');
  div3.classList.add('cloudRight');
  weatherIcon.appendChild(div3);
  for (let i = 0; i < 8; i++) {
    const div = document.createElement('div');
    div.classList.add(`rain${i + 1}`);
    weatherIcon.appendChild(div);
  }
  const div9 = document.createElement('div');
  div9.classList.add('thunder1');
  weatherIcon.appendChild(div9);
  const div10 = document.createElement('div');
  div10.classList.add('thunder2');
  weatherIcon.appendChild(div10);
};

// cloudsRainAndThunder();

const createCloudsAndSnow = () => {
  clearIconField();
  const div2 = document.createElement('div');
  div2.classList.add('cloudLeft');
  weatherIcon.appendChild(div2);
  const div3 = document.createElement('div');
  div3.classList.add('cloudRight');
  weatherIcon.appendChild(div3);

  const div4 = document.createElement('div');
  div4.classList.add('snowIcon');
  div4.innerHTML = `
  
  
					<svg
						width="258"
						height="209"
						viewBox="0 0 258 209"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M45.8928 44.2449L24.7244 58.4808L0.518657 49.9421L21.6871 35.7062L45.8928 44.2449Z"
							fill="#97BBF1"
						/>
						<path
							d="M81.4501 1.75966L76.7187 26.9347L53.75 38.1141L58.4814 12.9391L81.4501 1.75966Z"
							fill="#97BBF1"
						/>
						<path
							d="M97.5124 50.5014L73.3203 58.7246L52.1034 44.221L76.2955 35.9978L97.5124 50.5014Z"
							fill="#97BBF1"
						/>
						<path
							d="M51.2936 93.6016L38.8782 71.0654L49.3349 47.7323L61.7503 70.2685L51.2936 93.6016Z"
							fill="#97BBF1"
						/>
						<path
							d="M47.7379 38.8229L25.6707 25.6837L22.8226 0.181497L44.8899 13.3207L47.7379 38.8229Z"
							fill="#97BBF1"
						/>
						<path
							d="M97.8928 159.245L76.7244 173.481L52.5187 164.942L73.6871 150.706L97.8928 159.245Z"
							fill="#97BBF1"
						/>
						<path
							d="M133.45 116.76L128.719 141.935L105.75 153.114L110.481 127.939L133.45 116.76Z"
							fill="#97BBF1"
						/>
						<path
							d="M149.512 165.501L125.32 173.725L104.103 159.221L128.296 150.998L149.512 165.501Z"
							fill="#97BBF1"
						/>
						<path
							d="M103.294 208.602L90.8782 186.065L101.335 162.732L113.75 185.269L103.294 208.602Z"
							fill="#97BBF1"
						/>
						<path
							d="M99.7379 153.823L77.6707 140.684L74.8226 115.181L96.8899 128.321L99.7379 153.823Z"
							fill="#97BBF1"
						/>
						<path
							d="M205.893 82.2449L184.724 96.4808L160.519 87.9421L181.687 73.7062L205.893 82.2449Z"
							fill="#97BBF1"
						/>
						<path
							d="M241.45 39.7597L236.719 64.9347L213.75 76.1141L218.481 50.9391L241.45 39.7597Z"
							fill="#97BBF1"
						/>
						<path
							d="M257.512 88.5014L233.32 96.7246L212.103 82.221L236.296 73.9978L257.512 88.5014Z"
							fill="#97BBF1"
						/>
						<path
							d="M211.294 131.602L198.878 109.065L209.335 85.7323L221.75 108.269L211.294 131.602Z"
							fill="#97BBF1"
						/>
						<path
							d="M207.738 76.8229L185.671 63.6837L182.823 38.1815L204.89 51.3207L207.738 76.8229Z"
							fill="#97BBF1"
						/>
					</svg>
				
  
  `;
  weatherIcon.appendChild(div4);
};

// cloudsAndSnow();

// TODO Implement degrees range, create css or svg icons
