const express = require('express');
const db = require('../../data/dbModel.js');

const app = express();

// Commented temporarily for testing
//
app.get('*', async (req, res) => {
  const users = await db.find();
  if (!users) {
    return res.sendStatus(404);
  }

  return res.json(users);
});

// app.get('*', (req, res) => {
//     res.write('<h1><marquee direction=right>Hello from Express path `/` on Now 2.0!</marquee></h1>')
//     res.write('<h2>Go to <a href="/about">/about</a></h2>')
//     res.end()
// })
if (!process.env.NOW_REGION) {
  app.listen();
} 

module.exports = app

