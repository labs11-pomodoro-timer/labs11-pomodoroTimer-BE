const express = require('express');
const db = require('../../data/dbModel.js');
const app = express();

app.get('/api/users', async (req, res) => {
  const users = await db.find();
  if (!users) {
    return res.sendStatus(404);
  }

  return res.json(users);

});
module.exports = app;