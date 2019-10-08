const express = require('express')
const path = require('path')
const hsb = require('hbs')

const app = express()

console.log(__dirname)
console.log(__filename)

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hsb.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vince'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: 'Jackson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: 'Jackson'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        title: 'Weather page',
        lat: 37.00,
        long: 32.28 
    })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})