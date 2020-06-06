const http = require('http');
const thru = require('through2');

const server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req
      .pipe(
        thru(function (buf, enc, next) {
          this.push(buf.toString().toUpperCase());
          next();
        })
      )
      .pipe(res);
    }
});

server.listen(process.argv[2]);
