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

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
  .findById(id)
  .then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'user not found'})
    }
  })
  .catch(err => {
    res
    .status(500)
    .json({ message: "we failed you", error: err })
  })
});



module.exports = router;