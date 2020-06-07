/* Global Variables */
const baseUrl = 'http://api.geonames.org/searchJSON?name=';
const username = 'iulia.bivolaru';
const weatherBaseUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherAppKey = 'ee0952e297ae4d8aa4dfdc5167564b17';
const pixabayAppKey = '16916435-bc8568a553f5e9414319aa047';
const pixabayBaseUrl = 'https://pixabay.com/api/?key=';

function handleSubmit(event) {
    event.preventDefault();
    const forms = document.getElementsByClassName('needs-validation');
    console.log('form validity');
    console.log(Client.validateForm());
    var validation = Array.prototype.filter.call(forms, function(form) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else if((document.getElementById('start-date').value != '' && 
          datesDifferenceInDays(document.getElementById('start-date').value) < 0)) {
              console.log('date too small');
            // document.getElementById('invalid-date').innerHTML = 'Date must be bigger than current date';
            // document.getElementById('invalid-date').classList.add('invalid-feedback');
          } else {
            populateAndGetWeatherData();
          }
          form.classList.add('was-validated');
    });
    if (!Client.validateForm()) {
        // form.classList.add('was-validated');
        // event.preventDefault();
        // event.stopPropagation();
    }
    // populateAndGetWeatherData();
    // event.preventDefault();
}

function updateUIWithWeather(data) {
    if(data[0]) {
        document.getElementById('max_temp').innerHTML = 'Max temp: ' + data[0].max_temp;
        document.getElementById('min_temp').innerHTML = 'Min temp: ' + data[0].min_temp;
    } else {
        document.getElementById('max_temp').innerHTML = 'Date too far away for a weather forecast';
    }
}

function populateAndGetWeatherData() {
    const destinationCity = document.getElementById('destination').value.trim();
    getGeoData(baseUrl, destinationCity)
        .then(data => {
            // postWeatherData('/addWeatherData', 
            // { latitude: data.geonames[0].lat,
            //   longitude: data.geonames[0].lng,
            //   country: data.geonames[0].countryName });
            // updateUI(data, usersFeelings);
            getWeatherData(weatherBaseUrl, data.geonames[0].lat, data.geonames[0].lng)
                .then(data => updateUIWithWeather(data));          
        });
        getPixabayData(pixabayBaseUrl, destinationCity)
            .then(data => {
                console.log('data pixabay');
                console.log(data);
                document.getElementById('image').src = data.hits[0].largeImageURL;
            });
}

const getWeatherData = async (weatherBaseUrl, lat, lng) => {
    const startDate = document.getElementById('start-date').value;
    const numberOfDays = datesDifferenceInDays(startDate);
    document.getElementById('countdown').innerHTML = numberOfDays + ' days until your trip';
    const response = await fetch(weatherBaseUrl + lat + '&lon=' + lng + '&key=' + weatherAppKey);
    try {
        const data = await response.json();
        return data.data.filter(element => element.datetime == startDate);
    } catch(error) {
        console.log(error);
    }
}

const getGeoData = async (baseUrl, destinationCity) => {
    const response = await fetch(baseUrl + destinationCity + '&maxRows=1' + '&username=' + username);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

const getPixabayData = async (pixabayBaseUrl, q) => {
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

const datesDifferenceInDays = function(date) {
    const currentDate = new Date();
    const givenDate = new Date(date);
    return Math.floor((Date.UTC(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24));
}

export { handleSubmit }
