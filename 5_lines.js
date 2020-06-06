const split = require('split');
const thru = require('through2');

let counter = 0;
process.stdin
  .pipe(split())
  .pipe(thru(function(line, enc, next) {
    counter += 1;
    if (counter % 2 === 0) {
      this.push(line.toString().toUpperCase());
    } else {
      this.push(line.toString().toLowerCase());
    }
    next();
  }))
  .pipe(process.stdout);
