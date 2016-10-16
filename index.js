var request = require('request');
var Typewriter = require('typewriter');

class BigdotsIO {
  constructor(config, callback) {
    this.key = config.key;
    this.activeMacro = null;

    request.get({
      url: buildUrl(`displays/${this.key}`)
    }, (error, response, body) => {
      this.config = JSON.parse(body);
      callback();
    });
  }

  clearAll(callback = function() {}) {
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

  createTextArea(options) {
    var typewriter = new Typewriter(options);

    return {
      write: (text, callback = function() {}) => {
        typewriter.write(text, (coordinates) => {
          this.update(coordinates, callback);
        });
      }
    };
  }

  macro(name, options, callback = function() {}) {
    request.patch({
      url: buildUrl(`displays/${this.key}`),
      body: JSON.stringify({
        macroConfig: options,
        macro: name
      })
    }, callback);
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
