const sqlite = require('sqlite3');
const Promise = require('bluebird');
const knex = require('knex')({ client: 'sqlite', useNullAsDefault: true });

let db;

async function getDB(filename = ':memory:') {

  if (db) {
    return db;
  }

  db = new sqlite.Database(filename);

  Promise.promisifyAll(db);

  await db.runAsync(knex.schema.createTable('tags', table => {
    table.increments('id');
    table.string('tag');
  }).toString());

  await db.runAsync(knex.schema.createTable('slides', table => {
    table.increments('id');
    table.int('index');
  }).toString());

  await db.runAsync(knex.schema.createTable('photos', table => {
    table.increments('id');
    table.string('orientation', 1);
    table.int('slide');
    table.foreign('slide').references('id').inTable('slides');
  }).toString());

  return db;
}

async function populateDB(data) {

  const db = await getDB();
}

module.exports = { getDB };
