const { Command } = require('commander');

try {
    const ACTIONS = ['encode', 'decode'];
    const program = new Command();
    program
        .requiredOption('-s, --shift <number>', 'a shift')
        .requiredOption('-a, --action <type>', 'an action encode/decode')
        .option('-i, --input <inputfile>', 'an input file')
        .option('-o, --output <outputfile>', 'an output file');

    program.parse(process.argv);

    if (isNaN(program.shift)) {
        throw new Error('Shift parameter is not valid!');
    }

    if (!ACTIONS.includes(program.action.toString())) {
        throw new Error('Action parameter is not valid!');
    }

    module.exports = program;
} catch (error) {
    console.error(`Encoding failed with: ${error}`);
    process.exit(1);
}
