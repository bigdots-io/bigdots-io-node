# Bigdots.io Node API

Use Node? Great! This is the rich interface to programmatically update a Bigdots.io LED board.

### Update Individual Dots

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
    ])
  });
});
```

### Display Text

Display text with Rich formating and alignment is easy and quick. For available fonts, reference the [fonts repo](https://github.com/bigdots-io/fonts).

```js
var bigdots = new BigdotsIO({
  key: "YOUR-BOARD-KEY"
}, function() {

  bigdots.clearAll(function() {
    // Save a reference to your textarea
    var textArea = bigdots.createTextArea({
      font: 'system-16',
      alignment: 'right',
      startingColumn: 95,
      startingRow: 1,
    });

    textArea.write('100,001');

    // You can call the write function multiple times and
    // only the diff will be updated, and not all the dots
    // that have not changed. Performance!
    textArea.write('100,011');
  });
});
```

### Using Macros

BigDots Macros are prebuilt LED Display programs that you can config via options. For a list of available macros, see the [macros library repo](https://github.com/bigdots-io/macro-library).

```js
var bigdots = new BigdotsIO({
  key: "YOUR-BOARD-KEY"
}, function() {

  bigdots.macro('twinkle', {
    color: '#CCCCCC'
  });
});
```
