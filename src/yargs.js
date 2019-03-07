const yargs = require('yargs');

yargs.option('input', {
  alias: 'i',
  describe: 'Input dataset'
}).option('output', {
  alias: 'o',
  describe: 'Output file or stream',
  default: process.stdout
}).boolean('maximize').alias('maximize', 'm').demandOption('i');

module.exports = yargs.argv;
