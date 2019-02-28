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
  const usedIds = [];

  const pushSlide = (p1, p2) => {

    if (usedIds.includes(p1.id) || usedIds.includes(p2.id)) {
      return;
    }

    slides.push(getSlide(p1, p2));
    usedIds.push(p1.id, p2.id);
  };

  if (photos.length > 1000) {
    const chunked = _.chunk(photos, 2);
    chunked.forEach(( [ p1, p2 ] )=> {
      pushSlide(p1, p2);
    });
    return slides;
  }

  for (let i = photos.length - 1; i > 0; i--) {

    const p1 = photos[i];
    let min = Infinity;
    let pair;

    for (let j = i - 1; j >= 0; j--) {

      const p2 = photos[j];
      const diff = p1.tags.length + p2.tags.length - _.union(p1.tags, p2.tags).length;
      if (!diff) {
        pushSlide(p1, p2);
        continue;
      }

      if (diff < min) {
        min = diff;
        pair = { p1, p2 };
      }
    }

    if (pair) {
      pushSlide(pair.p1, pair.p2);
    }
  }

  return slides;
}

function getSlide(p1, p2) {
  const photos = [ p1, p2 ].filter(p => p);
  const tags = _.uniq(photos.reduce((acc, val) => acc.concat(val.tags), []));
  return { photos, tags };
}

module.exports = { getSlides };
