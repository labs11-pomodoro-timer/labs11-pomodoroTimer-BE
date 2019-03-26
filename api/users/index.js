const express = require('express');

const db = require('../../data/dbModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  db
  .find()
  .then(users => {
      res.status(200).json(users);
  })
  .catch(err => res.status(500).json(err));
});

module.exports = router;