// The plan for the timer will be as follows:
// The server will regularly check the user database for timers that are set 
// to expire soon. When a timer is set to expire, the server will load up a 
// timeout that will execute the stop code.

require('dotenv').config();
const express = require('express');
const request = require('request');
const router = express.Router();


const db = require('../../data/timerModel');

function countDown(time) {
    console.log("countDown initiated");
    waitAndSee(time);
}

// This function will utilize the clearTimeout
// function clearTimer() {
//     clearTimeout(timeOut);
// }
      

function waitAndSee(times) {
    if(times < 1) {
        return;
    }
    setTimeout(function() {
        console.log(times);
        waitAndSee(times-1);
    }, 1000)
}

router.get('/start/:time', (req, res) => {
    const { time } = req.params;
    let initialTime;

    if(time === "short"){
        initialTime = 5*60;
    }else if(time === "long"){
        initialTime = 15*60;
    }else if(time === "focus"){
        initialTime = 25*60;
    }else if(isNaN(time) === false){
        initialTime = parseInt(time);
    }else {
        res.status(404).json({ message: 'Cannot process request, time argument invalid.'})
    }

    countDown(initialTime);
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