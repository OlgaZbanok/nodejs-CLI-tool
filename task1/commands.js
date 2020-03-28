const { Command } = require('commander');

try {
    const program = new Command();
    program
        .requiredOption('-s, --shift <number>', 'a shift')
        .requiredOption('-a, --action <type>', 'an action encode/decode')
        .option('-i, --input <inputfile>', 'an input file')
        .option('-o, --output <outputfile>', 'an output file');


    module.exports = program;
} catch (error) {
    console.error(`Encoding failed with: ${error}`);
    process.exit(1);
}
