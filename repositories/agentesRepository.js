const db = require('../db/db');

function findAll() {
  return db('agentes').select('*');
}

function findById(id) {
  return db('agentes').where({ id }).first();
}

function create(agente) {
  return db('agentes').insert(agente).returning('*');
}

function update(id, data) {
  return db('agentes').where({ id }).update(data).returning('*');
}

function remove(id) {
  return db('agentes').where({ id }).del();
}

module.exports = { findAll, findById, create, update, remove };
