const request = require('request');

const forecast = (latitude, longitude, callback) => {
    // Correct URL formatting for WeatherAPI
    const url = `http://api.weatherapi.com/v1/current.json?key=24e07e58d7dd4038bf535103252704&q=${latitude},${longitude}`;

    request({ url: url, json: true }, (error,  response ) => {
        if (error) {
            return callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find the location!', undefined);
        } else {

            // Sending the formatted weather description to the callback
            callback(undefined, 
                `${response.body.current.condition.text}. It is currently ${response.body.current.temp_c}°C outside. It feels like ${response.body.current.feelslike_c}°C`
            );
        }
    });
};

module.exports = forecast;
