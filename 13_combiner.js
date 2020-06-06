const combine = require('stream-combiner');
const split = require('split');
const Readable = require('readable-stream');
const thru = require('through2');
const zlib = require('zlib');

module.exports = function () {
  let library;
  return combine(
    split(),
    thru(function(buf, enc, next) {
      if (buf.length) {
        const entry = JSON.parse(buf);
        if (entry.type === 'genre') {
          if (library) {
            this.push(JSON.stringify(library));
          }
          library = { name: entry.type, books: [] };
        } else if (entry.type === 'book') {
          library.books.push(entry.name);
        }
      }
      next();
    }),
    zlib.createGzip(),
  );
}
