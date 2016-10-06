# Bigdots.io Node API

Use Node? Great! This is the interface to programmatically update a Bigdot.io LED board.

```js
var options = {
  key: "-KJYAuwg3nvgTdSaGUU9"
};

var bigdots = new BigdotsIO({
  key: "YOUR-BOARD-KEY"
}, function() {
  bigdots.clear(function() {
    bigdots.text('Hello!', {
      font: 'system-medium',
      alignment: 'right',
      startingColumn: 95,
      startingRow: 1,
    });
  });
});

```
