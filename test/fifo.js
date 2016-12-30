var test = require('tape');
var fs = require('fs');

var fifo = require('../app/fifo');
var menu = [
      { "type": "tea",      "brew_time": 3, "profit": 2 },
      { "type": "latte",    "brew_time": 4, "profit": 3 },
      { "type": "affogato", "brew_time": 7, "profit": 5 }
    ],
    baristas = [1, 2],
    workday = { start: 0, end: 100 };

var testInput = __dirname + '/sample-files/input.json';
var testOutput = __dirname + '/sample-files/output_fifo.json';
var fulfill = fifo(menu, baristas, workday);

test('fifo', function(t) {
  var input = JSON.parse(fs.readFileSync(testInput));
  var expected = JSON.parse(fs.readFileSync(testOutput));
  var actual = fulfill(input);

  t.deepEqual(actual, expected, 'Cool beans, it works');
  t.end();
});
