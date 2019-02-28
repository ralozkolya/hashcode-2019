const { input, output } = require('./src/yargs');
const { read, write } = require('./src/io');
const { getSlides } = require('./src/process');
const { sort } = require('./src/sort');

(async () => {

  const data = await read(input);

  const slides = getSlides(data.photos);

  const links = sort(slides);

  write(output, links);

})();
