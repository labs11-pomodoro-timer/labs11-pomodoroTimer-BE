// The plan for the timer will be as follows:
// The server will regularly check the user database for timers that are set
// to expire soon. When a timer is set to expire, the server will load up a
// timeout that will execute the stop code.

require("dotenv").config();
const express = require("express");
const request = require("request");
const router = express.Router();
const bodyParser = require('body-parser');

const db = require("../../data/dbModel");

router.use(bodyParser.urlencoded({ extended: true }));

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
    if (times < 1) {
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
    setTimeout(function () {
        console.log(times);
        waitAndSee(times - 1);
    }, 1000);
}

// This is the heartbeat of the timer
// At a regular interval (every 30 seconds) this interval executes a function
// that checks all users in the database for active timers
// A user with a timer that is ending soon will be scheduled a timeout for a
// function that sends a GET request to the endpoint that stops the timer
setInterval(function () {
    db.find()
        .then(users => {
            if (users) {
                for (let i = 0; i < users.length - 1; i++) {
                    if (users[i].timerEnd === null | users[i].timerStart === null) {
                        // If a user does not have an active timer, we don't want anything
                        // to happen to them and we will skip them.
                        console.log(`User #${users[i].id} does not have an active timer.`);
                        continue;
                    }
                    if (users[i].timerEnd < Date.now()) {
                        // If the end time was missed, this is the cleanup code
                        // Here, code should be executed to clear the user's
                        // timer and set the fields back to null
                        console.log(`User #${users[i].id} needs their timer cleared. Tidying up...`);
                        request({
                            uri: `http://localhost:8000/api/timer/stopTimer/${users[i].id}`,
                            // uri: `https://focustimer-labs11.herokuapp.com/api/timer/stopTimer/${users[i].id}`,
                            method: 'PUT',
                            timeout: 3000,
                        }, function (error, response, body) {
                            // console.log("Error: ", error);
                            // console.log("Response: ", response);
                            // console.log("Body: ", body);
                        });
                    }
                    if (users[i].timerEnd - Date.now() <= 30000 && users[i].timerEnd - Date.now() > 0) {
                        // Here is where we will queue up our function that
                        // begins the Timeout until the timer information
                        // is cleared from the user's database
                        function setTimertoEnd() {
                            console.log('inside setTimer')

                            let timeRemaining = users[i].timerEnd - Date.now();
                            console.log(`Setting User#${users[i].id} to end timer in ${timeRemaining}ms`)
                            setTimeout(function () {
                                console.log(`${users[i].id} should have their timer ended here`);
                                request({
                                    uri: `http://localhost:8000/api/timer/stopTimer/${users[i].id}`,
                                    // uri: `https://focustimer-labs11.herokuapp.com/api/timer/stopTimer/${users[i].id}`,
                                    method: 'PUT',
                                    timeout: 3000,
                                }, function (error, response, body) {
                                    // All of the work is currently being done at the endpoint we're sending
                                    // a request to, but this function is here in case we want to execute additional
                                    // code at this time.
                                    // 
                                    // console.log("Error: ", error);
                                    // console.log("Response: ", response);
                                    // console.log("Body: ", body);
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


// This is the endpoint that will be hit to initiate the check of users
// who are about a minute away from ending their focus timer, if their timer
// is set to expire soon, a timeout will be started that will clear the timer
// information once it reaches the deadline

// WARNING THIS ENDPOINT IS STILL UNDER DEVELOPMENT, MAY CONTAIN ERRORS

router.get('/', (req, res) => {
    db.find()
        .then(users => {
            if (users) {
                let newUsers = [];
                for (let i = 0; i < users.length - 1; i++) {
                    if (user[i].timerEnd - user[i].timerStart <= 60000) {
                        // Here is where we will queue up our function that
                        // begins the Timeout until the timer information
                        // is cleared from the user's database
                        newUsers.push(user[i])
                    }
                }
                console.log(newUsers);
                res.status(200).json({ users: newUsers })
            }
        }
        )
        .catch(err => {
            res.status(500).json({ message: 'server error', err })
        })
});

router.get("/start/:time", (req, res) => {
    const { time } = req.params;
    let initialTime;

    if (time === "short") {
        initialTime = 5 * 60;
    } else if (time === "long") {
        initialTime = 15 * 60;
    } else if (time === "focus") {
        initialTime = 25 * 60;
    } else if (isNaN(time) === false) {
        initialTime = parseInt(time);
    } else {
        res
            .status(404)
            .json({ message: "Cannot process request, time argument invalid." });
    }

    countDown(initialTime);
    res.status(200).json({ message: "Timer Started" });
});

// WARNING - UNDER DEVELOPMENT - timerEnd current set to 2 minutes to test!
router.put('/startTimer/:id', (req, res) => {
    const { id } = req.params;
    const timerStart = Date.now();
    const timerEnd = Date.now() + 1000 * 60 * 2;
    const changes = {
        "timerStart": timerStart,
        "timerEnd": timerEnd
    }
    db.update(id, changes)
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
// TESTING TESTING TESTING
router.put('/startTimer/:id/:timer', (req, res) => {
    let initialTime;
    const { id } = req.params;
    const { timer } = req.params;

    if (timer === "short") {
        initialTime = 5 * 60;
    } else if (timer === "long") {
        initialTime = 15 * 60;
    } else if (timer === "focus") {
        initialTime = 25 * 60;
    } else if (isNaN(timer) === false) {
        initialTime = parseInt(timer);
    } else {
        res
            .status(404)
            .json({ message: "Cannot process request, time argument invalid." });
    }

    const timerStart = Date.now();
    const timerEnd = Date.now() + 1000 * initialTime;
    const changes = {
        "timerName": timer,
        "timerStart": timerStart,
        "timerEnd": timerEnd
    };

    db.update(id, changes)
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

router.get('/checkTimer/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            if (user) {
                if (user.timerEnd != null) {
                    const currentTime = Date.now();
                    const timeleft = Math.floor((user.timerEnd - currentTime) / (1000 * 60));
                    res.status(200).json({ message: `user is in "${user.timerName}" mode for ${timeleft} more minutes` });
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

router.put('/stopTimer/:id', async (req, res) => {
    const { id } = req.params;
    const user = await db.findById(id);
    const changes = {
        "timerName": null,
        "timerStart": null,
        "timerEnd": null
    }
    db.update(id, changes)
        .then(count => {
            if (count) {
                res.status(200).json({ message: `${count} user(s) updated` });
                console.log(`timer for ${user.firstname} (user #${user.id}) has completed`);
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'server error', err })
        })

});

//! testing for slash commands
router.post('/timerStart', (req, res) => {
    console.log('new request', req.body);
    // console.log(req.res);
    // console.log('timer start post');
})

module.exports = router;