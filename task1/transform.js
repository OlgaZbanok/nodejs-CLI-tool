const { Transform } = require('stream');
const program = require('./commands');
const ceaserCipher = require('./ceaserCipher');

try {
    const transform = new Transform({
        transform: (chunk, encoding, done) => {
            const result = ceaserCipher(
                chunk.toString(),
                +program.shift,
                program.action === 'encode'
            );
            done(null, result);
        }
    });
    module.exports = transform;
} catch (error) {
    console.error(`Encoding failed with: ${error}`);
    process.exit(1);
}
