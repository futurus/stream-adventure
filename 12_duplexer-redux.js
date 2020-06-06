const duplexer = require('duplexer2');
const thru = require('through2').obj;

const ctObj = {};

module.exports = function (counter) {
  return duplexer({ objectMode: true },
    thru(function (chunk, enc, next) {
      ctObj[chunk.country] = (ctObj[chunk.country] || 0) + 1;
      next();
    }, function (done) {
      counter.setCounts(ctObj);
      done();
    }),
    counter);
};
