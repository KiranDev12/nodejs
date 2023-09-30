const fs = require('fs');

fs.readFile(__filename, function cb(err, data) {
  console.log('File data is', data);
});

console.log('TEST');

//* ITERATION 1 : it just runs the readFile, initialized the callback func, proceeds to log the TEST
//* ITERATION 2 : the call back function executes

//! check the sequences of the Output

