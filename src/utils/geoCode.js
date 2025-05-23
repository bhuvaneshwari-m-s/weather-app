const request = require('request')
const geoCode = ( address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ address + '&access_token=pk.eyJ1IjoiYmh1dmFuZXNod2FyaTIwMDYiLCJhIjoiY205cDl3cHQzMTNuejJqc2EzenRrMGh6ZyJ9.SO5Gk8U76r-avTw9SvKt1A&limit=1'
    request({url : url, json : true}, (error, response) => {
        if(error)
        {
            callback('Unable to connect to location services!', undefined)
        }
        else if(response.body.features.length === 0)
        {
            callback('Unable to find the location.Try another search.',undefined)
        }
        else{
            callback(undefined , {
                 longitude : response.body.features[0].geometry.coordinates[0],
                 latitude  : response.body.features[0].geometry.coordinates[1],
                 place     : response.body.features[0].properties.full_address 
            })
        }
    })
}
module.exports = geoCode

