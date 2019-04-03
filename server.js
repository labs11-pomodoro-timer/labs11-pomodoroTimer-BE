const express = require('express');
const cors = require('cors');
const app = express();
const usersRouter = require('./api/users/index.js');
const slackUsersRouter = require('./api/slackUsers/index.js');
const pomodoroTimerRouter = require('./api/timer/index.js');
const stripeRouter = require('./api/stripe/index.js');
require('dotenv').config();

const stripe = require("stripe")(process.env.SECRETKEY);

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/slackUsers', slackUsersRouter);
app.use('/api/timer', pomodoroTimerRouter);
app.use('/api/stripe', stripeRouter);

app.get('/', (req, res) => {
    res.status(200).json({ api: 'alive' });
});

app.post("/charge", async (req, res) => {
    try {
      let { status } = await stripe.charges.create({
        amount: 1,
        currency: "usd",
        description: "An example charge",
        source: req.body
      });
  
      res.json({ status });
    } catch (err) {
      res.status(500).end();
    }
  });

module.exports = app;