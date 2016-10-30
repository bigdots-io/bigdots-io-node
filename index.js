var request = require('request');
var Typewriter = require('typewriter');
var getPixels = require('get-pixels');

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

  image(url, callback = function() {}) {
    getPixels(url, (err, pixels) => {
      if(err) {
        callback(err);
      }

      var imageWidth = pixels.shape[0],
          imageHeight = pixels.shape[1];

      var coordinates = [];

      for(let x = 0; x < imageWidth; x++) {
        for(let y = 0; y < imageHeight; y++) {
          var r = pixels.get(x, y, 0),
              g = pixels.get(x, y, 1),
              b = pixels.get(x, y, 2),
              a = pixels.get(x, y, 3);

          var hex = rgb2hex(`rgba(${r}, ${g}, ${b}, ${a})`)

          coordinates.push({ x: x, y: y, hex: hex });
        }
      }

      this.update(coordinates, function() {
        callback();
      });
    })
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

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" + ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

module.exports = BigdotsIO;
