const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlesbars and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    webpageCreator: 'Michael Nirk'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    webpageCreator: 'Michael Nirk'
  });
});

app.get('/help', (req, res) => {
  const helpMessage = "Having trouble? Send an email to me@app.com for assistance!";
  res.render('help', {
    title: 'Help',
    helpMessage: helpMessage,
    webpageCreator: 'Michael Nirk'
  })
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }
  
  geocode(req.query.address, (geoCodeError, {lat, long, location} = {}) => {
    if (geoCodeError) {
      return res.send({
        error: geoCodeError
      });
    } 
    forecast(lat, long, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({
          error: forecastError
        });
      }
      forecastData.address = req.query.address;
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    })
  })
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term!'
    });
  }

  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    pageNotFoundMessage: 'Help article not found!',
    creatorName: 'Michael Nirk'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    pageNotFoundMessage: 'Page not found!',
    creatorName: 'Michael Nirk'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});