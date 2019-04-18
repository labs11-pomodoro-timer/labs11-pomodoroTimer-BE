require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const request = require("request");

const dbUsers = require("../../data/dbModel");
const dbSlack = require("../../data/dbslackUserModel");

// This is how the information will be sent to this POST endpoint for
// Slack events.
// {
//     "token": "XXYYZZ",
//     "team_id": "TXXXXXXXX",
//     "api_app_id": "AXXXXXXXXX",
//     "event": {
//             "type": "name_of_event",
//             "event_ts": "1234567890.123456",
//             "user": "UXXXXXXX1",
//             ...
//     },
//     "type": "event_callback",
//     "authed_users": [
//             "UXXXXXXX1",
//             "UXXXXXXX2"
//     ],
//     "event_id": "Ev08MFMKH6",
//     "event_time": 1234567890
// }

function sendMessageToSlackResponseURL(responseURL, JSONmessage) {
    let postOptions = {
      uri: responseURL,
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      json: JSONmessage
    };
    request(postOptions, (error, response, body) => {
      if (error) {
        // Error handling
        res.json({ error: "Error." });
      }
    });
  };

 // This function is for posting normal messages
 function postMessage(JSONmessage, token) {
    let postOptions = {
      uri: `https://slack.com/api/chat.postMessage`,
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      json: JSONmessage
    };
    request(postOptions, (error, response, body) => {
      if (error) {
        // Error handling
        res.json({ error: "Error." });
      }
    });
  };

// This function is for posting ephemeral messages
function postEphMessage(JSONmessage, token) {
    let postOptions = {
      uri: `https://slack.com/api/chat.postEphemeral`,
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      json: JSONmessage
    };
    request(postOptions, (error, response, body) => {
      if (error) {
        // Error handling
        res.json({ error: "Error." });
      }
    });
  };


router.post("/", async (req, res) => {
    const reqBody = req.body;
    console.log(reqBody);
    // sendMessageToSlackResponseURL(responseURL, JSONmessage)
    res.status(200).send(reqBody.challenge);
    // If a notification is detected, we need to extract which user
    // is being notified and save that to a variable
    if (reqBody.event.type === "message") {

    const messageText = reqBody.event.text;
    const channelToRespond = reqBody.event.channel;
    const slackUsers = await dbSlack.find();
    console.log(messageText);
    for (let i = 0; i < slackUsers.length; i++) {
        const userId = slackUsers[i].userId;
        const userEmail = slackUsers[i].userEmail;
        console.log(userId);
        if (messageText.includes(userId)) {
            const user = await dbUsers.findByEmail(userEmail);
            console.log(user);
            if (user.timerEnd) {
            const sender = reqBody.event.user;
            const timeLeft = (user.timerEnd - user.timerStart) / 1000 / 60;
            const whichTimer = user.timerName;
            console.log(`User ${userId} has reached Eph message statement`);
            postEphMessage({
                user: sender,
                channel: channelToRespond,
                text: `That person is currently in ${whichTimer} mode for ${timeLeft} minutes and may not be available to answer.`
                }, process.env.BOT_TOKEN);
            }
        }
    }
}

    

});

module.exports = router
