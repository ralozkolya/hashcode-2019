const yargs = require('yargs');

yargs.option('input', {
  alias: 'i',
  describe: 'Input dataset'
}).option('output', {
  alias: 'o',
  describe: 'Output file or stream',
  default: process.stdout
}).demandOption('i');

module.exports = yargs.argv;
