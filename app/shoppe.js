var fs = require('fs');
var { menu, baristas, workday } = require('../config/shoppe-details');

var fulfill = require('./fifo')(menu, baristas, workday);
var inputFile = process.argv[2];

fs.readFile(inputFile, 'utf-8', function(err, data) {
  try {
    var orders = JSON.parse(data);
  } catch(e) {
    console.log(e);
  }
  console.log(fulfill(orders));
});
