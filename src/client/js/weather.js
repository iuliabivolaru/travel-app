/* Global Variables */
const baseUrl = 'http://api.geonames.org/searchJSON?name=';
const username = 'iulia.bivolaru';

function handleSubmit(event) {
    event.preventDefault();
    populateAndGetWeatherData();
}

function updateUI(data, usersFeelings) {
    document.getElementById('country').innerHTML = 'Country: ' + data.geonames[0].countryName;
    document.getElementById('lat').innerHTML = 'Latitude: ' + data.geonames[0].lat;
    document.getElementById('lng').innerHTML = 'Longitude: ' + data.geonames[0].lng;
}

function populateAndGetWeatherData() {
    const zipCode = document.getElementById('zip').value;
    const countryCode = document.getElementById('country').value;
    const usersFeelings = document.getElementById('feelings').value;
    getWeatherData(baseUrl, zipCode)
        .then(data => {
            console.log('dataaa');
            console.log(data);
            postWeatherData('/addWeatherData', 
            { latitude: data.geonames[0].lat,
              longitude: data.geonames[0].lng,
              country: data.geonames[0].countryName });
            updateUI(data, usersFeelings);                     
        });
}

const getWeatherData = async (baseUrl, zipCode) => {
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
