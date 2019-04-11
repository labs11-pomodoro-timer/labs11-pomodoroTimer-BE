const db = require("./dbConfig.js");

module.exports = {
  find,
  findById,
  findByEmail,
  findByUserId,
  remove,
  add,
  update,
  getUser
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

function findByUserId(userId) {
  return db("slackUsers")
    .where({ userId })
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

function getUser(email) {
  return db("users")
    .where({ email })
    .first();
}
