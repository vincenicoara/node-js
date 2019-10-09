const express = require('express')
const path = require('path')
const hsb = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

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
    if (!req.query.address){
        // console.log('returned message')
        return res.send({error: 'You must enter in an address.'})
    }

    geocode(req.query.address, (err1, {location, lat, long} = {}) => {
        if (err1){
            return res.send(err1)
        }
        forecast(lat, long, (err2, forecast) => {
            if (err2){
                return res.send(err2)
            }
            res.send({
                forecast,
                location,
                addressSearched: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: "Help article not found.",
        name: 'Vince'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: "Page not found.",
        name: 'Vince'
    })
})

app.listen(port, () => {
    console.log('Listening on port ' + port)
})