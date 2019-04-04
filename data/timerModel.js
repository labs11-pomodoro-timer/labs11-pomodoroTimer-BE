const db = require("./dbConfig");

module.exports = {
    updateTS,
    findById,
    find
};

function updateTS(id, changes) {
  return db("testing")
    .where({ id })
    .update(changes);
}

function findById(id) {
    return db('testing')
        .where({ id })
        .first();
}

function find() {
    return db('testing');
}
