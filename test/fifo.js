var test = require('tape');
var fs = require('fs');
var fifo = require('../app/fifo');
var { menu, baristas, workday } = require('../config/shoppe-details');

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
