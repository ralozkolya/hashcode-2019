const _ = require('lodash');

function getSlides(photos) {

  const vertical = [];
  const horizontal = [];

  photos.forEach(photo => {
    if (photo.orientation === 'V') {
      vertical.push(photo);
    } else {
      horizontal.push(photo);
    }
  });

  const horizontalSlides = horizontal.map(photo => getSlide(photo));
  const verticalSlides = matchVertical(vertical);

  return horizontalSlides.concat(verticalSlides);

}

function matchVertical(photos) {

  const slides = [];

  const pushPair = (p1, i) => {
    const p2 = photos.splice(i, 1)[0];
    slides.push(getSlide(p1, p2));
  };

  let p1;
  outer: while (p1 = photos.pop()) {
    for (let i = photos.length - 1; i >= 0; i--) {
      const p2 = photos[i];
      const diff = p1.tags.length + p2.tags.length - _.union(p1.tags, p2.tags).length;

      if (diff < 1) {
        pushPair(p1, i);
        continue outer;
      }

    }
    pushPair(p1, 0);
  }

  return slides;
}

function getSlide(p1, p2) {
  const photos = [ p1, p2 ].filter(p => p);
  const tags = _.uniq(photos.reduce((acc, val) => acc.concat(val.tags), []));
  return { photos, tags };
}

module.exports = { getSlides };
