const fs = require('fs-extra');
const byline = require('byline');
const Promise = require('bluebird');

async function read(path, encoding = 'utf8') {

  await fs.access(path);
  const stream = byline(fs.createReadStream(path, { encoding }));

  let response;

  return new Promise((resolve, reject) => {

    stream.on('error', reject);
    stream.on('finish', () => resolve(response));

    let id = 0;
    stream.on('data', line => {

      if (!response) {
        return response = { photoCount: parseInt(line), photos: [] };
      }

      const [ orientation, tagCount, ...tags ] = String(line).split(' ');

      const slide = { orientation, tagCount, tags, id: id++ };

      response.photos.push(slide);
    });

  });
}

function write(destination, slides) {

  if (typeof destination === 'string') {
    destination = fs.createWriteStream(destination);
  }

  return new Promise((resolve, reject) => {

    destination.on('error', reject);

    destination.write(slides.length + '\n');

    slides.forEach(slide => {
      destination.write(slide.photos.map(p => p.id).join(' ') + '\n');
    });

    destination.end(resolve);

  });
}

module.exports = { read, write };
