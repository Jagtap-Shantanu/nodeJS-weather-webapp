const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hhdzQ0NSIsImEiOiJja29waDdhaWcwY3F1Mm9raHpzODY1MGl4In0.Nu1uoIyXZHDSOEbRzWkkCg&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to connect. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                location : body.features[0].place_name,
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode