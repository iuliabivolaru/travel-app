
// Setup empty JS object to act as endpoint for all routes
var projectData = {};
receivedDataArray = [];

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
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, () => console.log(`server up and running on localhost:${port}`));

// GET and POST route handlers
app.get('/all', function getHandler(request, response) {
    response.send(projectData);
});

app.post('/data', function postHandler(request, response) {
    let body = request.body;
    let weatherData = {
        temperature: body.temperature,
        date: body.date,
        userReponse: body.userReponse
    };
    receivedDataArray.push(weatherData);
});