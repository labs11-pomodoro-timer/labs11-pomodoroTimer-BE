const db = require('./dbConfig');

module.exports = {
    updateTS,
    findById
};

function updateTS(id, changes) {
    return db('testing')
        .where({ id })
        .update(changes); 
}

function findById(id) {
    return db('testing')
        .where({ id })
        .first();
}