var BigdotsIO = require('./index');

var bigdots = new BigdotsIO({
  key: "-KRqJxR-IZhJ0juXJt88"
}, function() {
  bigdots.macro('programmable', {}, function() {
    bigdots.clearAll(function() {
      // bigdots.image("http://www.brr.ac.th/images/hot-news.gif");

      // bigdots.macro("image", {
      //   url: "http://www.brr.ac.th/images/hot-news.gif"
      // });

      // bigdots.text({
      //   text: 'HELLO WORLD',
      //   alignment: 'center'
      // });
    });
  });
});
