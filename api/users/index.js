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

router.get('/:email', (req, res) => {
  const { email } = req.params;

  db
  .findByEmail(email)
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

router.post('/', async (req, res) => {
  try {
    const userData = req.body;
    const userId = await db.add(userData);
    const user = await db.findById(userId[0]);
    res.status(201).json(user);
  } catch (error) {
    let message = 'error creating the user';

    res.status(500).json({ message, error });
  }
});

module.exports = router;