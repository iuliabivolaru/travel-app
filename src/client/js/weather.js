/* Global Variables */
const baseUrl = 'http://api.geonames.org/searchJSON?name=';
const username = 'iulia.bivolaru';
const weatherBaseUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherAppKey = 'ee0952e297ae4d8aa4dfdc5167564b17';
const pixabayUsername = 'iuliabivolaru10';
const pixabayAppKey = '16916435-bc8568a553f5e9414319aa047';
const pixabayBaseUrl = 'https://pixabay.com/api/?key=';

function handleSubmit(event) {
    event.preventDefault();
    populateAndGetWeatherData();
}

function updateUI(data) {
    document.getElementById('country').innerHTML = 'Country: ' + data.geonames[0].countryName;
    document.getElementById('lat').innerHTML = 'Latitude: ' + data.geonames[0].lat;
    document.getElementById('lng').innerHTML = 'Longitude: ' + data.geonames[0].lng;
}

function updateUIWithWeather(data) {
    document.getElementById('max_temp').innerHTML = 'Max temp: ' + data.data[0].max_temp;
    document.getElementById('min_temp').innerHTML = 'Min temp: ' + data.data[0].min_temp;
}

function populateAndGetWeatherData() {
    const zipCode = document.getElementById('zip').value;
    getGeoData(baseUrl, zipCode)
        .then(data => {
            console.log('dataaa');
            console.log(data);
            // postWeatherData('/addWeatherData', 
            // { latitude: data.geonames[0].lat,
            //   longitude: data.geonames[0].lng,
            //   country: data.geonames[0].countryName });
            // updateUI(data, usersFeelings);
            getWeatherData(weatherBaseUrl, data.geonames[0].lat, data.geonames[0].lng)
                .then(data => updateUIWithWeather(data));          
        });
        getPixabayData(pixabayBaseUrl, zipCode)
            .then(data => {
                console.log('data pixabay');
                console.log(data);
                document.getElementById('image').src = data.hits[0].largeImageURL;
            });
}

const getWeatherData = async (weatherBaseUrl, lat, lng) => {
    console.log('url');
    console.log(weatherBaseUrl + lat + '&lon=' + lng + '&key=' + weatherAppKey);
    const response = await fetch(weatherBaseUrl + lat + '&lon=' + lng + '&key=' + weatherAppKey);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

const getGeoData = async (baseUrl, zipCode) => {
    console.log('url');
    console.log(baseUrl + zipCode + '&username=' + username);
    const response = await fetch(baseUrl + zipCode + '&maxRows=1' + '&username=' + username);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

const getPixabayData = async (pixabayBaseUrl, q) => {
    console.log('url');
    console.log(pixabayBaseUrl + pixabayAppKey + '&q=' + q);
    const response = await fetch(pixabayBaseUrl + pixabayAppKey + '&q=' + q);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

const postWeatherData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const postedData = await response.json();
        return postedData;
    } catch(error) {
        console.log("error", error);
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let todaysDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

export { handleSubmit }
