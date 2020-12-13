const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoibmlya3VsZXMiLCJhIjoiY2toYXhqdWlyMWlueTJ3bzV2YmdwcnRjbyJ9.IHhr9KjQcgwokT99-RHUfA&limit=1`;
  request({
    url,
    json: true
  }, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to Mapox!');
    } else if (body.hasOwnProperty('message') || !body.features.length) {
      callback('Location not found!');
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  })
};

module.exports = geocode;