
// Setup empty JS object to act as endpoint for all routes
var weatherData = {};
var receivedDataArray = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
const port = 8080;
app.listen(port, () => console.log(`server up and running on localhost:${port}`));

// GET and POST route handlers
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});
app.get('/all', function getHandler(request, response) {
    response.send(receivedDataArray);
});

app.post('/geoAndWeatherData', function postHandler(request, response) {
    let body = request.body;
    weatherData = {
        lat: body.latitude,
        lng: body.longitude,
        country: body.country,
        maxTemp: body.maxTemp,
        minTemp: body.minTemp
    };
    receivedDataArray.push(weatherData);
    response.send({post: "successful"});
    console.log(receivedDataArray);
});

