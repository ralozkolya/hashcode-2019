const yargs = require('yargs');

yargs.option('input', {
    alias: 'i',
    describe: 'Input dataset'
}).option('output', {
    alias: 'o',
    default: process.stdout
}).demandOption('i');

module.exports = yargs.argv;
