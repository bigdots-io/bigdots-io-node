var request = require('request');
var Typewriter = require('typewriter');

class BigdotsIO {
  constructor(config, callback) {
    this.key = config.key;

    request.get({
      url: buildUrl(`displays/${this.key}`)
    }, (error, response, body) => {
      this.config = JSON.parse(body);
      callback();
    });
  }

  clear(callback = function() {}) {
    var coordinates = [];

    for(let x = 0; x < this.config.width; x++) {
      for(let y = 0; y < this.config.height; y++) {
        coordinates.push({y: y, x: x, hex: '#000000'});
      }
    }

    this.update(coordinates, callback);
  }

  update(coordinates, callback = function() {}) {
    var transformedCoordinates = transformCoordinates(coordinates);
    request.patch({
      url: buildUrl(`matrices/${this.config.matrix}`),
      body: JSON.stringify(transformedCoordinates)
    }, callback);
  }

  text(message, options, callback = function() {}) {
    new Typewriter(options).text(message, (coordinates) => {
      this.update(coordinates, callback);
    });
  }
}

var buildUrl = function(uri) {
  return `https://led-fiesta.firebaseio.com/${uri}.json`
}

var transformCoordinates = function(coordinates) {
  var transformedCoordinates = {};

  coordinates.forEach(function(coordinate) {
    transformedCoordinates[`${coordinate.y}:${coordinate.x}`] = {
      hex: coordinate.hex || '#000000',
      updatedAt: Date.now()
    };
  });

  return transformedCoordinates;
}

module.exports = BigdotsIO;
