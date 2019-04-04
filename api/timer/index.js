// The plan for the timer will be as follows:
// The server will regularly check the user database for timers that are set 
// to expire soon. When a timer is set to expire, the server will load up a 
// timeout that will execute the stop code.

require('dotenv').config();
const express = require('express');
const request = require('request');
const router = express.Router();


const db = require('../../data/timerModel');

function intervalPoll() {

}

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
        console.log("countdown finished");
        // request({
        //     url: "/",
        //     method: "GET",
        //     json: true,
        // }, function (error, response, body) {
        //     console.log(response);
        // })
        return;
    }
    setTimeout(function() {
        console.log(times);
        waitAndSee(times-1);
    }, 1000)
}

// This is the heartbeat of the timer
// At a regular interval (every 30 seconds) this interval executes a function
// that checks all users in the database for active timers
// A user with a timer that is ending soon will be scheduled a timeout for a
// function that sends a GET request to the endpoint that stops the timer
setInterval(function() {
        db.find()
        .then(users => {
            if (users) {
                for (let i = 0; i < users.length-1;i++) {
                    if (users[i].focusEnd === null | users[i].focusStart === null) {
                        // If a user does not have an active timer, we don't want anything
                        // to happen to them and we will skip them.
                        console.log(`User #${users[i].id} does not have an active timer.`);
                        continue;
                    }
                    if (users[i].focusEnd < Date.now()) {
                        // If the end time was missed, this is the cleanup code
                        // Here, code should be executed to clear the user's
                        // timer and set the fields back to null
                        console.log(`User #${users[i].id} needs their timer cleared. Tidying up...`);
                        request({
                            uri: `http://localhost:8000/api/timer/stopFocus/${users[i].id}`,
                            method: 'PUT',
                            timeout: 3000,
                            }, function (error, response, body) {
                                // The endpoint here is doing all the work, so we don't currently
                                // need this function to do anything. However, we have it as an
                                // option.
                                // Console logs for testing
                                //console.log("Error: ", error);
                                //console.log("Response: ", response);
                                //console.log("Body: ", body);
                        });
                    }
                    if (users[i].focusEnd - Date.now() <= 30000 && users[i].focusEnd - Date.now() > 0) {
                        // Here is where we will queue up our function that
                        // begins the Timeout until the timer information
                        // is cleared from the user's database
                        function setTimertoEnd() {
                            
                            let timeRemaining = users[i].focusEnd - Date.now();
                            console.log(`Setting User#${users[i].id} to end timer in ${timeRemaining}ms`)
                            setTimeout(function() {
                                console.log(`${users[i].id} should have their timer ended here`);
                                request({
                                    uri: `http://localhost:8000/api/timer/stopFocus/${users[i].id}`,
                                    method: 'PUT',
                                    timeout: 3000,
                                    }, function (error, response, body) {
                                        // The endpoint here is doing all the work, so we don't currently
                                        // need this function to do anything. However, we have it as an
                                        // option.
                                        // Console logs for testing
                                        //console.log("Error: ", error);
                                        //console.log("Response: ", response);
                                        //console.log("Body: ", body);
                                });
                            }, timeRemaining);
                        }
                        setTimertoEnd();
                    }
                }
            }
        })
        .catch(err => {
            console.log({ message: 'server error', err })
        })
    }, 30000)
    

// This is the endpoint that will show all users who are currently running a timer

// WARNING THIS ENDPOINT IS STILL UNDER DEVELOPMENT, MAY CONTAIN ERRORS

router.get('/', (req, res) => {
    db.find()
    .then(users => {
        if (users) {
            let newUsers = [];
            for (let i = 0; i < users.length-1;i++) {
                if (users[i].focusEnd && users[i].focusStart) {
                    
                    newUsers.push(user[i])
                }
            }
            console.log(newUsers);
            res.status(200).json({ users: newUsers})
        }
        else {
            res.status(200).json({ message: "No users are running timers" })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'server error', err })
    })
});

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

// WARNING - UNDER DEVELOPMENT - focusEnd current set to 2 minutes to test!
router.put('/startFocus/:id', (req, res) => {
    const { id } = req.params;
    const focusStart = Date.now();
    const focusEnd = Date.now() + 1000 * 60 * 2;
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