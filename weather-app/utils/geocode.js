const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9lYmlkZW4xMDEiLCJhIjoiY2sxaDFmZnM4MWFvMzNpczE3MGwzczRjdSJ9.fFc_W6qBsQUcp3fjka71Pw'

    request({url, json: true}, (error, response) => {
        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.features.length == 0){
            callback('No search results found. Please update query and search again', undefined)
        } else {
            const location = response.body.features[0].place_name
            const lat = response.body.features[0].center[1]
            const long = response.body.features[0].center[0]
            callback(undefined, {
                location, lat, long
            })
        }
    })
}

module.exports = geocode