const { input, output, maximize } = require('./src/yargs');
const { read, write } = require('./src/io');
const { getSlides } = require('./src/process');
const { sort } = require('./src/sort');

(async () => {

  const data = await read(input);
  const slides = getSlides(data.photos);
  const sorted = sort(slides, maximize);
  await write(output, sorted);

})();
