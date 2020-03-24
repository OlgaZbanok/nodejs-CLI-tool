const cipher = require('./ceaserCipher');
const { Command } = require('commander');

const fs = require('fs');
const path = require('path');
const { Transform, pipeline } = require('stream');
const { promisify } = require('util');

const program = new Command();

program.storeOptionsAsProperties(false);

program
  .requiredOption('-s, --shift <code>', 'a shift')
  .requiredOption('-a, --action <type>', 'an action encode/decode')
  .option('-i, --input <inputfile>', 'an input file')
  .option('-o, --output <outputfile>', 'an output file');

program.parse(process.argv);
const programOptions = program.opts();

const caeserCipherEncode = new Transform({
  transform: (chunk, encoding, done) => {
    const result = cipher.ceaserCipher(
      chunk.toString(),
      +programOptions.shift,
      programOptions.action === 'encode'
    );
    done(null, result);
  }
});

const pipelineAsync = promisify(pipeline);

const inputStream = programOptions.input
  ? fs.createReadStream(path.join(__dirname, programOptions.input))
  : process.stdin;
const outputStream = programOptions.output
  ? fs.createWriteStream(path.join(__dirname, programOptions.output))
  : process.stdout;

(async function doCeaserCipher() {
  try {
    await pipelineAsync(inputStream, caeserCipherEncode, outputStream);
    console.log('Encoding succeeded');
  } catch (err) {
    console.error(`Encoding failed with error ${err}`);
  }
}());
