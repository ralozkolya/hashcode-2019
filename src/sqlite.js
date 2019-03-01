const Promise = require('bluebird');

const { database } = require('./yargs');
const knex = require('knex')({
  client: 'sqlite',
  useNullAsDefault: true,
  connection: {
    filename: database
  }
});

async function createSchema() {

  await knex.schema.createTable('slides', table => {
    table.increments('id');
    table.integer('index');
  });

  await knex.schema.createTable('photos', table => {
    table.increments('id');
    table.string('orientation', 1);
    table.integer('slide');
    table.foreign('slide').references('id').inTable('slides');
  });

  await knex.schema.createTable('tags', table => {
    table.increments('id');
    table.string('tag');
    table.string('photo');
    table.foreign('photo').references('id').inTable('photos');
  });
}

async function populateDB(data) {
  return runWithRelease(async () => {
    await createSchema();
    return Promise.map(data.photos, async ({ id, orientation, tags }) => {

      await knex('photos').insert({ id,  orientation });

      tags = tags.map(tag => ({ tag, photo: id }));
      await knex('tags').insert(tags);
    }, { concurrency: 10 });
  });
}

async function runWithRelease(cb) {
  try {
    return await cb();
  } catch (e) {
    await close();
    throw e;
  }
}

async function getPhotos() {
  return await knex('photos as p')
    .select('p.id', 't.tag')
    .count('p.id as tagCount')
    .join('tags as t', 't.photo', 'p.id')
    .groupBy('t.tag');
}

function close() {
  return knex.destroy();
}

module.exports = { populateDB, getPhotos, close, knex };
