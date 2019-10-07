const request = require('request')

const url = 'https://api.darksky.net/forecast/213cc3c9bb64802003231e3252dffa39/37.8267,-122.4233'

request({url: url, json: true}, (error, response) => {
    // console.log(response.body.currently)
    const temp = response.body.currently.temperature
    const chanceOfRain = response.body.currently.precipProbability
    const summary = response.body.daily.data[0].summary

    console.log(summary + ' Currently it is %d degrees out and there is a %d% chance of rain', temp, chanceOfRain)
})