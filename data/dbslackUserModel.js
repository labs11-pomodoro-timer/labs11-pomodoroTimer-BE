const db = require("./dbConfig.js");

module.exports = {
  find,
  findById,
  findByEmail,
  remove,
  add,
  update
};

function find() {
  return db("slackUsers");
}

function findById(id) {
  return db("slackUsers")
    .where({ id })
    .first();
}

function findByEmail(userEmail) {
  return db("slackUsers")
    .where({ userEmail })
    .first();
}

function remove(id) {
  return db("slackUsers")
    .where({ id })
    .del();
}

function add(user) {
  return db("slackUsers")
    .insert(user)
    .into("slackUsers");
}

function update(id, changes) {
  return db("slackUsers")
    .where({ id })
    .update(changes);
}
