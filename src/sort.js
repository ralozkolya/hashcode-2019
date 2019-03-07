const _ = require('lodash');

function sort(slides, _maximize = false) {

  const push = (i) => {
    const slide = slides.splice(i, 1)[0];
    if (weigh(sorted[0], slide) <= weigh(sorted[sorted.length - 1], slide)) {
      sorted.push(slide);
    } else {
      sorted.unshift(slide);
    }
    return slide;
  };

  let target = 0;

  if (!_maximize) {
    target = average(slides, 1000);
  }

  let s1 = slides.pop();
  const sorted = [ s1 ];

  outer: while (slides.length) {

    let max = 0;

    for (let i = slides.length - 1; i >= 0; i--) {

      const s2 = slides[i];
      const weight = weigh(s1, s2);

      if (!_maximize) {
        if (weight >= target) {
          s1 = push(i);
          continue outer;
        }
      }

      max = max < weight ? i : max;
    }

    s1 = push(max);

  }

  return sorted;

}

function weigh({ tags: t1 }, { tags: t2 }) {
  const intersection = _.intersection(t1, t2);
  const d1 = _.difference(t1, intersection);
  const d2 = _.difference(t2, intersection);
  return Math.min(intersection.length, d1.length, d2.length);
}

function average(slides, sampleSize = 100) {

  const indices = {};
  const length = Math.min(slides.length, sampleSize);

  for (let i = 0; i < length; i++) {

    let key;

    do {
      key = Math.floor(Math.random() * slides.length);
    } while (indices[key]);

    indices[key] = slides[key];
  }

  const picked = Object.keys(indices).map(id => indices[id]);

  const weights = [];

  for (let i = 0; i < picked.length; i++) {
    const p1 = picked[i];
    for (let j = i + 1; j < picked.length; j++) {
      const p2 = picked[j];
      weights.push(weigh(p1, p2));
    }
  }

  return Math.floor(weights.reduce((a, v) => a + v, 0) / weights.length);

}

module.exports = { sort };
