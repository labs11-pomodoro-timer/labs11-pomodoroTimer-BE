const db = require("./dbConfig.js");

module.exports = {
  find,
  findById,
  findByEmail,
  add,
  update,
  remove
};

function find() {
  return db("testing");
}

function findById(id) {
  return db("testing")
    .where({ id })
    .first();
}

function findByEmail(email) {
  return db("testing")
    .where({ email })
    .first();
}

function add(user) {
  return db("testing")
    .insert(user)
    .into("testing");
}

function update(id, changes) {
  return db("testing")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("testing")
    .where({ id })
    .del();
}
