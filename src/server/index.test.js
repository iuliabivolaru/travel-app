const request = require('supertest');
const app = require('./index');

describe('post endpoint', () => {
    it('should successfully post to /geoAndWeatherData', async (done) => {
        const res = await request(app)
            .post('/geoAndWeatherData')
            .send({
                lat: 45,
                lng: 5,
                country: 'France',
                maxTemp: 25,
                minTemp: 18
            });
        expect(res.text).toEqual("{\"post\":\"successful\"}");
        done();
    })
})