import axios from "axios";
import { event } from "jquery";


const API_KEY  = "231e693249c451722a61291da5d536de";
const BACKEND_URL = 'http://localhost:3000'; 

// axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5";
// axios.defaults.headers.common["x-api-key"] = API_KEY;


const btn = document.getElementById("btn");
const getFavBtn = document.getElementById('getfavbtn');

const weatherInfo = document.getElementById("weather-info");
const foreContainer = document.getElementById("fore-container");
const weatherFore = document.getElementById("forecast");
// const favoritesInfo = document.getElementById('favorites-info');
const favoritesContainer = document.getElementById('favorites-container');


window.saveFavorite = async function(cityName) {
    try {
        const response = await fetch(`${BACKEND_URL}/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city: cityName })
        });
        if (!response.ok) {
            const errorText = await response.json();
            throw new Error(errorText.message || 'Failed to save favorite city');
        }
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        alert(error.message);
    }
}

window.removeFavorite = async function(cityName) {
    try {
        const response = await fetch(`${BACKEND_URL}/favorites`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city: cityName })
        });
        if (!response.ok) {
            const errorText = await response.json();
            throw new Error(errorText.message || 'Failed to remove favorite city');
        }
        const result = await response.json();
        alert(result.message);
        displayFavorites();
    } catch (error) {
        alert(error.message);
    }
}


btn.addEventListener('click', function(e){
    e.preventDefault();
    const cityElement = document.getElementById("city-input");
    weatherFore.innerHTML = " ";
    const cityName = cityElement.value.trim();
    if(cityName) {
        if( weatherInfo.style.display === 'none' || foreContainer.style.display === "none"){
            weatherInfo.style.display = 'block';
            foreContainer.style.display = "block";
        }
        getWeather(cityName);
        getForecast(cityName);

        if(favoritesContainer.style.display !== 'none'){
            favoritesContainer.style.display = 'none'
        }

       
    }else {
        alert('Please enter a city name!');
    }
    console.log("cityName", cityName);
    
});

async function getWeather(cityName) {
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
        if(response.status !== 200) {
            throw new Error('City not found!');
    
        }
        const cityData = response.data;
        console.log("cityData", cityData)
        display(cityData);


    }catch(error) {
        console.error(error);
    }
}

async function display(cityData) {
    // const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
        <h2> ${cityData.name}</h2>
        <p>${cityData.main.temp}°C</p>
        <p>${cityData.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${cityData.weather[0].icon}.png" alt="Weather icon">
        <br>
        <button id="save-button" onclick="window.saveFavorite('${cityData.name}')">Save to Favorites</button>

        
    `;

}

async function getForecast(cityName) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`);
        if(response.status !== 200) {
            throw new Error('City not found!');
        }
        const cityForecastData = response.data;
        console.log("cityForecastData",cityForecastData);
        displayForecast(cityForecastData);

        

    }catch(error) {
       console.error(error);
    }
}

function displayForecast(cityForecastData) {
    
    const foreCastHead = document.getElementById("5dayForecast");
    foreCastHead.innerHTML = "<h2>5-Day Forecast</h2>";
    let forecastHtml = "";
  
    cityForecastData.list.forEach((foreCast, index) => {
        if(index % 8 === 0) {
            // const minTemp = Math.min(...cityForecastData.list.slice(index, index + 8).map(item => item.main.temp_min));
            // const maxTemp = Math.max(...cityForecastData.list.slice(index, index + 8).map(item => item.main.temp_max));
            const minTemp = Math.min(...cityForecastData.list.slice(index, index + 8).map(item => item.main.temp_min));
            const maxTemp = Math.max(...cityForecastData.list.slice(index, index + 8).map(item => item.main.temp_max));

            forecastHtml += `
                <div class="forecast-block">
                    <p> ${new Date(foreCast.dt_txt).toLocaleDateString()}</p>
                    <p> ${minTemp.toFixed(1)}°C - ${maxTemp.toFixed(1)}°C</p>
                    <img src="http://openweathermap.org/img/wn/${foreCast.weather[0].icon}.png" alt="Weather icon">
                    
                </div>
            `;
            // <p> ${${minTemp.toFixed(1)}°C foreCast.main.temp}°C</p>
             // <p> ${foreCast.weather[0].description}</p>
        } 
    });

    // weatherFore.innerHTML += forecastHtml;
    weatherFore.innerHTML = forecastHtml; // Changed from += to = to avoid duplication
    
}

getFavBtn.addEventListener('click', displayFavorites);

async function displayFavorites(e) {
    if (e) e.preventDefault(); 
    console.log("running")
    try {
        console.log('Fetching favorites from server...');
        // Clear previous content
        const favoritesInfo = document.getElementById('favorites-info');
        favoritesInfo.innerHTML = ''; 
        const response = await fetch(`${BACKEND_URL}/favorites`);
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to fetch favorite cities');
        }
        const favorites = await response.json();

        console.log('Favorites retrieved:', favorites);

        const favoritesHead = document.getElementById('favoritesHead');
        favoritesHead.innerHTML = '<h2>Favorite Cities</h2>';


        // Check if favorites is an array
        if (!Array.isArray(favorites)) {
            throw new Error('Invalid data format received from server');
        }

        for (const city of favorites) {
            const weather = await getFavoriteCityWeather(city);
            if (weather) {
                favoritesInfo.innerHTML += `
                    <div class="fav-item">
                        <h3>${city}</h3>
                        <p>${weather.main.temp}°C</p>
                        <p>${weather.weather[0].description}</p>
                        <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="Weather icon">
                        <br>
                        <button class="remove-btn" onclick="window.removeFavorite('${city}')">Remove</button>
                    </div>
                `;
            }
        }

        favoritesContainer.style.display = 'block';
        
        weatherInfo.style.display = 'none';
        foreContainer.style.display = "none";


    } catch (error) {
        console.error('Error fetching favorite cities:', error);
        alert('Error fetching favorite cities: ' + error.message);
        console.log('Response status:', error.response ? error.response.status : 'N/A');
        console.log('Response data:', error.response ? error.response.data : 'N/A');

    }
}



async function getFavoriteCityWeather(cityName) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
      if (response.status !== 200) {
        throw new Error('City not found');
      }
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  // Load favorite cities on page load
//   document.addEventListener('DOMContentLoaded', displayFavorites);



// document.addEventListener('click', function (event) {
//     if (!getFavBtn.contains(event.target) && !favoritesContainer.contains(event.target)) {
//         favoritesContainer.style.display = 'none';
//     }
// });

