const db = require('../db/db');

function findAll() {
  return db('casos').select('*');
}

function findById(id) {
  return db('casos').where({ id }).first();
}

function create(caso) {
  return db('casos').insert(caso).returning('*');
}

function update(id, data) {
  return db('casos').where({ id }).update(data).returning('*');
}

function remove(id) {
  return db('casos').where({ id }).del();
}

module.exports = { findAll, findById, create, update, remove };
