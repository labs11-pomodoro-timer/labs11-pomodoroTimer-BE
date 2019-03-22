const express = require('express')
const db = require('../../data/dbModel.js');
const app = express()

// endpoint that returns users from the database
app.get('/api/users', (req, res) => {
  db
  .find()
  .then(users => {
      res.status(200).json(users);
  })
  .catch(err => res.status(500).json(err));
});