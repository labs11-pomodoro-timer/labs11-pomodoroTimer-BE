const db = require('./dbConfig.js');

module.exports = {
    find,
    findById,
    remove,
};

function find() {
    return db('slackUsers');
}

function findById(id) {
    return db('slackUsers')
        .where({ id })
        .first();
}

function remove(id) {
    return db('testing')
        .where({ id })
        .del();
}