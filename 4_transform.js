const thru = require('through2');

function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

process.stdin.pipe(thru(write)).pipe(process.stdout);
