# Travel all around the world

This project is using the Geonames, Weatherbit and Pixabay APIs to determine a weather forecast and an image of the chosen city to travel to.

## Installation

Clone the GitHub repository and use npm to install the dependencies. Then start the server.

```
$ git clone https://github.com/iuliabivolaru/travel-app.git
$ npm install
$ npm run start
```
- to run the build environment:
`npm run build-dev`
- to run the prod environment:
`npm run build-prod`

## Usage

Go to `http://localhost:8080/`.

Fill in a city, a valid date, which has to be greater or equal than the current date.
A weather forecast will be provided if the date is not further away than 16 days from the current date.
An image of the city and the countdown until the trip will be displayed. 
If an end date is provided, the length in days of the trip will be displayed as well (project extension).
