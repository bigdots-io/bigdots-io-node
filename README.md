# Bigdots.io Node API

Use Node? Great! This is the rich interface to programmatically update a Bigdots.io LED board.

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

    var textArea = bigdots.createTextArea({
      font: 'system-16',
      alignment: 'right',
      startingColumn: 95,
      startingRow: 1,
    });

    var count = 10;

    setTimeout(function() {
      count += 1;
      textArea.write(count);
    }, 100)
  });
});

```
