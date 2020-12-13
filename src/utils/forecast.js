const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f728466c5551a560b139603296494de5&query=${encodeURIComponent(lat)},${encodeURIComponent(long)}`;

  request({
    url,
    json: true
  }, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to weather servcie');
    } else if (body.hasOwnProperty('success') && body.success === false) {
      callback('Unable to find location!');
    } else {
      callback(undefined, `It is ${body.current.weather_descriptions[0]} and ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
    }
  });
};

module.exports = forecast;