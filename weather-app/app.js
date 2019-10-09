const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

rl.question("Where would you like to get weather info for?\n", (answer) => {

    if (!answer){
        return console.log('Please provide an address!')
    }

    geocode(answer, (error, {location, lat, long} = {}) => {
        if (error){
            return console.log(error);
        }
        debugger
        forecast(lat, long, (error, forecastData) => {
            if (error){
                return console.log(error)
            }
            console.log('Location: ' + location + '\nLat: ' + lat + ', Long: ' + long)
            console.log(forecastData)
            rl.close()
            })
        
    })
})



