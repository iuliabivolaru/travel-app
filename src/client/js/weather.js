/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=2ce7c639a23cd64116b67d37126b24dd';
// document.getElementById('generate').addEventListener('click', populateAndGetWeatherData);

function handleSubmit(event) {
    event.preventDefault();
    populateAndGetWeatherData();
}

function updateUI(data, usersFeelings) {
    document.getElementById('date').innerHTML = 'Current date: ' + todaysDate;
    document.getElementById('temp').innerHTML = 'Feels-like temperature: ' + data.main.feels_like;
    document.getElementById('content').innerHTML = 'Your feelings: ' + usersFeelings; 
}

function populateAndGetWeatherData() {
    const zipCode = document.getElementById('zip').value;
    const countryCode = document.getElementById('country').value;
    const usersFeelings = document.getElementById('feelings').value;
    getWeatherData(baseUrl, zipCode, countryCode, apiKey)
        .then(data => {
            postWeatherData('/addWeatherData', 
            { temperature: data.main.feels_like,
              usersFeelings,
              date: todaysDate });
            updateUI(data, usersFeelings);                     
        });
}

const getWeatherData = async (baseUrl, zipCode, countryCode, apiKey) => {
    const response = await fetch(baseUrl + zipCode + "," + countryCode + apiKey);
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
