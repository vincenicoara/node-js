const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/213cc3c9bb64802003231e3252dffa39/' + lat + ',' + long

    request ({url, json: true}, (error, {body} = {}) => {
        if (error){
            callback({error: 'Unable to connect to weather service'}, undefined)
        } else if (body.error){
            callback({error: 'Invalid search request'}, undefined)
        } else {
            console.log(body.daily)
            callback(undefined, body.daily.data[0].summary 
                + ' It is currently ' + body.currently.temperature 
                + ' degrees out. There is a ' + body.currently.precipProbability
                + '% chance of rain and a windspeed of ' + body.daily.data[0].windSpeed + 'mph.'
            )
        }
    })

}

module.exports = forecast