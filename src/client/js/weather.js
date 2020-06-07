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
    const forms = document.getElementsByClassName('needs-validation');
    console.log('form validity');
    console.log(Client.validateForm());
    var validation = Array.prototype.filter.call(forms, function(form) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else if((document.getElementById('start-date').value != '' && 
          date_diff_indays(document.getElementById('start-date').value) < 0)) {
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

function updateUI(data) {
    document.getElementById('country').innerHTML = 'Country: ' + data.geonames[0].countryName;
    document.getElementById('lat').innerHTML = 'Latitude: ' + data.geonames[0].lat;
    document.getElementById('lng').innerHTML = 'Longitude: ' + data.geonames[0].lng;
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
    const zipCode = document.getElementById('zip').value.trim();
    console.log('datee');
    const dat = document.getElementById('start-date').value;
console.log(dat);
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
    const dat = document.getElementById('start-date').value;
    const dt1 = new Date();
    const dt2 = new Date(dat);
    const numberOfDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    document.getElementById('countdown').innerHTML = numberOfDays + ' days until your trip';
    const response = await fetch(weatherBaseUrl + lat + '&lon=' + lng + '&key=' + weatherAppKey);
    try {
        const data = await response.json();
        console.log('weatheeer data');
        console.log(data);
        const filteredData = data.data.filter(element => {
            console.log('in filter');
            console.log(element.datetime);
            console.log(dat);
            console.log(element.datetime == dat);
            return element.datetime == dat
        });
        console.log('filteredData');
        console.log(filteredData);
        return filteredData;
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

const date_diff_indays = function(date) {
    const dt1 = new Date();
    const dt2 = new Date(date);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

export { handleSubmit }
