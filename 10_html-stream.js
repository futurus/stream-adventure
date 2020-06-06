const thru = require('through2');
const trumpet = require('trumpet')();

const loud = trumpet.select('.loud').createStream();

loud
  .pipe(
    thru(function(buf, enc, next) {
      this.push(buf.toString().toUpperCase());
      next();
    })
  )
  .pipe(loud);

process.stdin.pipe(trumpet).pipe(process.stdout);
