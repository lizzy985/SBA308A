# Weather Dashboard Application
## Introduction
Welcome to the Weather Dashboard Application! This project is designed to showcase advanced JavaScript skills, including asynchronous programming, API interactions, and dynamic web content management. The application provides users with current weather conditions, a 5-day weather forecast, and the ability to save and manage favorite cities. This README will guide you through the application's features, setup, and usage.

## Objectives
1. **Asynchronous JavaScript** : Utilize Promises and async/await syntax for handling asynchronous operations.
2. **JavaScript Event Loop**: Demonstrate understanding by implementing event-driven features.
3. **API Interaction**: Fetch data from the OpenWeatherMap API using Axios.
4. **Modular Organization**: Use ES6 modules and imports to structure code.
5. **User Experience**: Provide a responsive and user-friendly interface.
## Features
* Current Weather: Display current weather conditions for a specified city, including temperature, description, and weather icon.
* 5-Day Forecast: Show a 5-day weather forecast with minimum and maximum temperatures, and weather icons.
* Favorites Management: Save cities as favorites and view them in a dedicated section. Remove cities from favorites as needed.
## Technologies Used
* JavaScript: For implementing application logic and asynchronous operations.
* Axios: For making HTTP requests to the OpenWeatherMap API.
* Fetch API: For interacting with a backend server to manage favorite cities.
* HTML/CSS: For structuring and styling the web page.
## Setup and Installation
1. Clone the Repository:

git clone <repository-url>
cd weather-dashboard
2. Install Dependencies:
Ensure you have Node.js installed, then run:
npm install
3. Set Up Environment:
Create a .env file in the root directory 
4. Run the Backend (if applicable):
Ensure your backend server is running at http://localhost:3000. If you don't have a backend, you can use the provided code to handle favorite cities.

5. Open the Application:
Open index.html in your browser to start using the Weather Dashboard Application.

## Usage
1. Enter a City: Type the name of a city into the input field and click the "Get Weather" button to view the current weather and forecast.

2. Save to Favorites: Click the "Save to Favorites" button to add the city to your list of favorite cities.

3. View Favorites: Click the "Get Favorites" button to display your saved cities along with their current weather information.

4. Remove from Favorites: Click the "Remove" button next to a favorite city to delete it from your list.

## Code Overview
* index.html: The main HTML file for the application.
* styles.css: CSS file for styling the application.
* scripts.js and server.js: JavaScript file containing the main logic for fetching weather data, displaying results, and managing favorites.
## Key Functions
* getWeather(cityName): Fetches current weather data for a given city and displays it.
* getForecast(cityName): Fetches and displays the 5-day weather forecast.
* saveFavorite(cityName): Saves a city to the favorites list via the backend server.
* removeFavorite(cityName): Removes a city from the favorites list via the backend server.
* displayFavorites(): Retrieves and displays saved favorite cities and their weather information.
## API Endpoints
* OpenWeatherMap API: Used for fetching weather data.

Current Weather 
5-Day Forecast
* Backend Server: Handles favorite cities.

POST /favorites: Save a city as a favorite. 
DELETE /favorites: Remove a city from favorites. 
GET /favorites: Retrieve the list of favorite cities. 
