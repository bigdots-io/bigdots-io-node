var request = require('request');
var DotGenerator = require("dot-generator");

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
    var result = new DotGenerator().color('#000000', {
      width: this.config.width,
      height: this.config.height,
    })

    this.update(result.dots, callback);
  }

  update(coordinates, callback = function() {}) {
    if(this.config.macro !== 'programmable') {
      console.log("\nLooks like you want to manaully update your board.. \nTry setting the macro to 'programmable' first! \n\n");
      return;
    }

    var transformedCoordinates = transformCoordinates(coordinates);
    request.patch({
      url: buildUrl(`matrices/${this.config.matrix}`),
      body: JSON.stringify(transformedCoordinates)
    }, callback);
  }

  text(options, callback = function() {}) {
    options.width = options.width || this.config.width;
    options.height = options.height || this.config.height;

    var result = new DotGenerator().text(options);
    this.update(result.dots, callback);
  }

  macro(name, options, callback = function() {}) {
    request.patch({
      url: buildUrl(`displays/${this.key}`),
      body: JSON.stringify({
        macroConfig: options,
        macro: name
      })
    }, () => {
      this.config.macro = name;
      this.config.macroConfig = options;

      callback();
    });
  }

  brightness(value = 20, callback = function() {}) {
    request.patch({
      url: buildUrl(`displays/${this.key}`),
      body: JSON.stringify({brightness: value})
    }, () => {
      callback();
    });
  }

  image(url, callbacks = {}) {
    new DotGenerator().image(url, {
      onSuccess: (result) => {
        if(result.animated) {
          console.log("\n\n Looks like you are trying to render an animated image. \n Use the image macro! \n\n");
        }

        this.update(result.data, function() {
          if(callbacks.onSuccess) {
            callbacks.onSuccess();
          }
        });
      }, onError: function() {
        if(callbacks.onSuccess) {
          callbacks.onError();
        }
      }
    })
  }
}

var buildUrl = function(uri) {
  return `https://bigdots-b46cc.firebaseio.com/${uri}.json`
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
