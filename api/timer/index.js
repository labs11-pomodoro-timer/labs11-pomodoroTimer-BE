require('dotenv').config();
const express = require('express');
const request = require('request');
const router = express.Router();
const {countDown} = require('./timer.js');

router.get('/:time', (req, res) => {
    const { time } = req.params;
    countDown(time);
    res.status(200).json({ message: 'Timer Started' });
});

module.exports = router;