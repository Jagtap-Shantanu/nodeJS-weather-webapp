const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirPath = path.join(__dirname, '..', 'public')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirPath))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shantanu Deepak Jagtap'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Shantanu Jagtap'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Shantanu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
})



app.get('/help/*', (req, res) => {
    res.render('404page', {
        errorMsg: 'Help article not found',
        name: 'Shantanu Jagtap',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        errorMsg: 'Page not found',
        name: 'Shantanu Jagtap',
        title:'404'
    })
})

app.listen(3000, () => {
    console.log('Server started...')
})