const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    if (typeof latitude == typeof '' || typeof longitude == typeof '' ) {
        callback('Unable to find weather data. Try another search')
    }
    else {
        const url = 'http://api.weatherstack.com/current?access_key=46e2a32772cca086440e22e72d2bc257&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

        request({ url, json: true}, (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather services!', undefined)
            } else if (body.error) {
                callback('Unable to find. Try another search.')
            }
            else {
                callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Humidity is ' + body.current.humidity + '%')
            }
        })

    }
}

module.exports = forecast