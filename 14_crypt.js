const crypto = require('crypto');

const [, , passPhrase, initValue] = process.argv;

process.stdin
  .pipe(crypto.createDecipheriv('aes256', passPhrase, initValue))
  .pipe(process.stdout);
