const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=abcf875738d91e640d4874e8f9224227&query='+latitude+','+ longitude
    request({url : url , json : true}, (error , { body }) => {
        if(error)
        {
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callback('Unable to find the location!', undefined)
        }
        else
        {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees outside. It feels like '  + body.current.feelslike )
        }
    })
} 

module.exports = forecast 