# Bigdots.io Node API

Use Node? Great! This is the rich interface to programmatically update a Bigdots.io LED board.

### Update Individual Dots

*Note:* Make sure you're using the [Programmable macro!](https://github.com/bigdots-io/macros)

```js
var bigdots = new BigdotsIO({
  key: "YOUR-BOARD-KEY"
}, function() {

  bigdots.clearAll(function() {
    bigdots.update([
      {x: 0, y: 0, hex: '#FFFFFF'},
      {x: 0, y: 1, hex: '#FFFFFF'},
      {x: 0, y: 1, hex: '#FFFFFF'},
      // ...
    ], function() {
      console.log('Rendered!');
    });
  });

});
```

### Display Text

Display text with rich formatting and alignment is easy and quick. For available fonts, reference the [fonts repo](https://github.com/bigdots-io/fonts).

*Note:* Make sure you're using the [Programmable macro!](https://github.com/bigdots-io/macros)

```js
var bigdots = new BigdotsIO({
  key: "YOUR-BOARD-KEY"
}, function() {

  bigdots.clearAll(function() {
    bigdots.text({
      font: 'system-16',
      alignment: 'right',
      text: 'Hello World'
    }, function() {
      console.log('Rendered!');
    });
  });

});
```

### Display Images

Displaying an image via a url is very easy. Just follow the example below.

*Note:* Make sure you're using the [Programmable macro!](https://github.com/bigdots-io/macros)

*Note:* If you are trying to display an animated image, use the [Image macro](https://github.com/bigdots-io/macros)!

```js
var bigdots = new BigdotsIO({
  key: "YOUR-BOARD-KEY"
}, function() {

  bigdots.image('http://..../your/image.png', {
    onSuccess: function() {
      console.log('Rendered!');
    },
    onError: function(err) {
      console.log('uh oh!', err);
    }
  });

});
```

### Using Macros

BigDots Macros are prebuilt LED Display programs that you can config via options. For a list of available macros, see the [Macros repo](https://github.com/bigdots-io/macros).

```js
var bigdots = new BigdotsIO({
  key: "YOUR-BOARD-KEY"
}, function() {

  bigdots.macro('twinkle', {
    color: '#CCCCCC'
  });

});
```
