const express = require('express');
const cors = require('cors');
const app = express();
const usersRouter = require('./api/users/index.js');
const slackUsersRouter = require('./api/slackUsers/index.js');

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/slackUsers', slackUsersRouter);

app.get('/', (req, res) => {
    res.status(200).json({ api: 'alive' });
});

module.exports = app;