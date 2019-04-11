require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const request = require("request");
const dbSlack = require("../../data/dbslackUserModel");
const dbUsers = require("../../data/dbModel");

// We will need bodyParser to communicate well with Slack
router.use(bodyParser.urlencoded({ extended: true }));
// HOF that takes in the uri and json message for a slack message
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

  // This function changes a user's status in Slack
  function changeUserStatus(token) {
    let postOptions = {
      uri: `https://slack.com/api/users.profile.set`,
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      json: {
        "profile": {
            "status_text": "in Focus Time",
            "status_emoji": ":tomato:",
            "status_expiration": 0
        }
    }
    };
    request(postOptions, (error, response, body) => {
      if (error) {
        // Error handling
        res.json({ error: "Error." });
      }
    });
  };

  router.post("/", urlencodedParser, (req, res) => {
    let reqBody = req.body;
    
    console.log(reqBody);

    // First test endpoint
    if (reqBody.command === "/timerstarttest") {

      //WARNING STILL IN DEVELOPMENT
      //MAKE SURE TO SET URI TO PROPER DEVELOPMENT ENDPOINT AS NEEDED
      let postOptions = {
        uri: `http://labs11-pomodorotimer.herokuapp.com/api/timer/start/10`,
        // uri: `http://localhost:8000/api/timer/start/10`,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          // Authorization: `Bearer ${token}`
        }        
      };
      request(postOptions, (error, response, body) => {
        if (error) {
          res.json({ error: "I am become error."});
        }
        res.json( { message: "Timer started!"} );
      })
      };

      // This is the endpoint for the slash command that enters a user
      // into Focus Time

    if (reqBody.command === "/focus") {
      let userId = reqBody.user_id;
      dbSlack
      .findByUserId(userId)
      .then(user => {
        let slackUser = user;
        console.log("Retrieved the user, which looks like: ", user);
        dbUsers
        .findByEmail(user.userEmail)
        .then(user => {
          let id = user.id;
          console.log("Retrieved the user ID, which looks like: ", id);
          let postOptions = {
            uri: `http://labs11-pomodorotimer.herokuapp.com/api/timer/startTimer/${id}/focus`,
            // uri: `http://localhost:8000/api/timer/startTimer/${id}/focus`,
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              // Authorization: `Bearer ${token}`
            }        
          };
          console.log("Here's what the uri looks like: ", postOptions.uri);
          request(postOptions, (error, response, body) => {
            if (error) {
              res.json({ error: "Unable to focus, error occurred."});
            }
            res.json({ message: "Timer started!"})
          })
        })
        .catch(err => {
          res.json({ error: "We went wrong on findByEmail()... sorry."});
        })
      })
      .catch(err => {
        res.json({ error: "We went wrong on findByUserId()... sorry"})
      })
      
      
    }
  });

  router.post("/report-focus-time", urlencodedParser, (req, res) => {
      // This route will report in an ephemeral message the time remaining
      // on the focus timer
      let reqBody = req.body;
      console.log("reqBody:", reqBody);
      let { channel_id, user_id } = reqBody;
      console.log({ channel_id: channel_id, user_id: user_id });

      dbSlack
        .findById(user_id)
        .then(data => {
            console.log({ data: data });

        })
  })

  router.post("/change-user-status", urlencodedParser, (req, res) => {
      // This route will write the user's custom status
  })

module.exports = router;