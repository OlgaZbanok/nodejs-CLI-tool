const program  = require('./commands');
const transform = require('./transform');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { promisify } = require('util');

const pipelineAsync = promisify(pipeline);

const inputStream = program.input
  ? fs.createReadStream(path.join(__dirname, program.input))
  : process.stdin;
const outputStream = program.output
  ? fs.createWriteStream(path.join(__dirname, program.output), { flags:'a' })
  : process.stdout;

(async function doCeaserCipher() {
  try {
    await pipelineAsync(
      inputStream,
      transform,
      outputStream);

    console.log('Encoding succeeded');
  } catch (err) {
    console.error(`Encoding failed with error ${err}`);
    process.exit(1);
  }
}());
