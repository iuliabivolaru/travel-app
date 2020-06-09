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
    Array.prototype.filter.call(forms, function(form) {
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            getGeoAndWeatherAndImageDataAndUpdateUI();
        }
            form.classList.add('was-validated');
    });
}

function updateUIWithCountdownAndTripLengthAndWeatherInfo(data) {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    document.getElementById('countdown').innerHTML = datesDifferenceInDays('', startDate) + ' days until your trip';
    if(endDate != '') {
        document.getElementById('trip-length').innerHTML = 'It\'s a ' + datesDifferenceInDays(startDate, endDate) + ' days vacation!';
    }
    if(data[0]) {
        document.getElementById('trip-info-title').innerHTML = 'Typical weather for this period:';
        document.getElementById('max_temp').innerHTML = 'High: ' + data[0].max_temp;
        document.getElementById('min_temp').innerHTML = 'Low: ' + data[0].min_temp;
        document.getElementById('weather-description').innerHTML = data[0].weather.description;
    } else {
        document.getElementById('max_temp').innerHTML = 'Date too far away for a weather forecast';
    }
}

function getGeoAndWeatherAndImageDataAndUpdateUI() {
    const destinationCity = document.getElementById('destination').value.trim();
    getGeoData(baseUrl, destinationCity)
        .then(data => {
            const lat = data.geonames[0].lat;
            const lng = data.geonames[0].lng;
            const countryName = data.geonames[0].countryName;
            getWeatherData(weatherBaseUrl, lat, lng)
                .then(data => {
                    updateUIWithCountdownAndTripLengthAndWeatherInfo(data);
                    postWeatherAndGeoData('/geoAndWeatherData', 
                        { latitude: lat,
                          longitude: lng,
                          country: countryName,
                          maxTemp: data[0] ? data[0].max_temp : '',
                          minTemp: data[0] ? data[0].min_temp : ''
                        });
                });          
        });
        getPixabayData(pixabayBaseUrl, destinationCity)
            .then(data => {
                console.log('data pixabay');
                console.log(data);
                document.getElementById('image').src = data.hits[0].largeImageURL;
                document.getElementById('image').classList.add('city-image');
            });
}

const getWeatherData = async (weatherBaseUrl, lat, lng) => {
    const startDate = document.getElementById('start-date').value;
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

const postWeatherAndGeoData = async (url = '', data = {}) => {
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

const datesDifferenceInDays = function(date, date2) {
    const givenDate = date ? new Date(date) : new Date();
    const givenDate2 = new Date(date2);
    return Math.floor((Date.UTC(givenDate2.getFullYear(), givenDate2.getMonth(), givenDate2.getDate()) - Date.UTC(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate()) ) /(1000 * 60 * 60 * 24));
}

export { handleSubmit, postWeatherAndGeoData }
