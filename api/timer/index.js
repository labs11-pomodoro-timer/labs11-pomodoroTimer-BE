require('dotenv').config();
const express = require('express');
const request = require('request');
const router = express.Router();
const {countDown} = require('./timer.js');

const db = require('../../data/timerModel');

router.get('/:time', (req, res) => {
    const { time } = req.params;
    countDown(time);
    res.status(200).json({ message: 'Timer Started' });
});

router.put('/startFocus/:id', (req, res) => {
    const { id } = req.params;
    const focusStart = Date.now();
    const focusEnd = Date.now() + 1000 * 60 * 25;
    const changes = {
        "focusStart": focusStart,
        "focusEnd": focusEnd
    }
    db.updateTS(id, changes)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} user(s) updated` });
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'server error', err })
        })
});

router.get('/checkFocus/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            if (user) {
                if (user.focusEnd != null) {
                    const currentTime = Date.now();
                    const timeleft = Math.floor((user.focusEnd - currentTime) / (1000 * 60));
                    res.status(200).json({ message: `user is in focus for ${timeleft} minutes` });
                } else {
                    res.status(200).json({ message: `${user.firstname} is not currently in focus time` })
                }
            } else {
                res.status(404).json({ message: 'unable to find user' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'server error', err });
        })
})

router.put('/stopFocus/:id', (req, res) => {
    const { id } = req.params;
    const changes = {
        "focusStart": null,
        "focusEnd": null
    }
    db.updateTS(id, changes)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} user(s) updated` });
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'server error', err })
        })
});

module.exports = router;