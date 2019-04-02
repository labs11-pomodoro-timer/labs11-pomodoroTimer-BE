const db = require('./dbConfig');

module.exports = {
    start,
    findById
};

function start(id, changes) {
    return db('testing')
        .where({ id })
        .update(changes); 
}

function findById(id) {
    return db('testing')
        .where({ id })
        .first();
}