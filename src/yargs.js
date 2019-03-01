const yargs = require('yargs');

yargs.option('input', {
  alias: 'i',
  describe: 'Input dataset'
}).option('output', {
  alias: 'o',
  describe: 'Output file or stream',
  default: process.stdout
}).option('database', {
  alias: 'd',
  describe: 'Database file path (or :memory:)',
  default: ':memory:'
}).demandOption('i');

module.exports = yargs.argv;
