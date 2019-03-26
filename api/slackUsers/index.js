const express = require('express');

const db = require('../../data/dbslackUserModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    db
        .find()
        .then(slackUsers => {
            res.status(200).json(slackUsers);
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;