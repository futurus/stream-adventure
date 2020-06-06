const crypto = require('crypto');
const { Parse } = require('tar');
const thru = require('through2');
const zlib = require('zlib');

const parser = new Parse();
const [, , algo, key, init] = process.argv;

parser.on('entry', function (entry) {
  if (entry.type !== 'File') {
    return entry.resume();
  }

  entry
    .pipe(crypto.createHash('md5', { encoding: 'hex' }))
    .pipe(
      thru(function(buf, enc, next) {
        this.push(`${buf.toString()} ${entry.path}\n`);
        next();
      })
    ).pipe(process.stdout);
});

process.stdin
  .pipe(crypto.createDecipheriv(algo, key, init))
  .pipe(zlib.createGunzip())
  .pipe(parser);
