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
  function changeUserStatusToFocus(token) {
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
        res.json({ error: "Error in changeUserStatusToFocus function" });
      }
    });
    request({
      uri: `https://slack.com/api/dnd.setSnooze?token=${token}&num_minutes=25&pretty=1`,
      method: "GET",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`
      }
    }, (error, response, body) => {
      if (error) {
        // Error handling
        res.json({ error: "Error setting do not disturb" });
      }
    })
  };

  function changeUserStatusToBlank(token) {
    let postOptions = {
      uri: `https://slack.com/api/users.profile.set`,
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      json: {
        "profile": {
            "status_text": "",
            "status_emoji": "",
            "status_expiration": 0
        }
    }
    };
    request(postOptions, (error, response, body) => {
      if (error) {
        // Error handling
        res.json({ error: "Error in changeUserStatusToBlank function" });
      }
    });
    request({
      uri: `https://slack.com/api/dnd.endDnd`,
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }, (error, response, body) => {
      if (error) {
        // Error handling
        res.json({ error: "Error setting do not disturb" });
      }
    })
  };
// THIS IS THE CENTRAL ROUTING POINT FOR ALL SLASH COMMANDS
// BE CAREFUL, THIS ENDPOINT IS QUITE LARGE AND EASY TO MESS UP
  router.post("/", urlencodedParser, (req, res) => {
    let reqBody = req.body;
    let command = reqBody.command;
    console.log(reqBody);

    // First test endpoint
    if (command === "/timerstarttest") {

      //WARNING STILL IN DEVELOPMENT
      //MAKE SURE TO SET URI TO PROPER DEVELOPMENT ENDPOINT AS NEEDED
      let postOptions = {
        uri: `https://focustimer-labs11.herokuapp.com/api/timer/start/10`,
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
      } else
      // Slash command for checking remaining time through Slack
      if (command === "/check") {
        let userId = reqBody.user_id;
        dbSlack
        .findByUserId(userId)
        .then(user => {
          // let slackUser = user;
          console.log("Retrieved the user, which looks like: ", user);
          dbUsers
          .findByEmail(user.userEmail)
          .then(user => {
            let id = user.id;
            console.log("Retrieved the user ID, which looks like: ", id);
            let postOptions = {
              uri: `https://focustimer-labs11.herokuapp.com/api/timer/checkTimer/${id}`,
              // uri: `http://localhost:8000/api/timer/checkTimer/${id}`,
              method: "GET",
              headers: {
                "Content-type": "application/json",
                // Authorization: `Bearer ${token}`
              }        
            };
            console.log("Here's what the uri looks like: ", postOptions.uri);
            request(postOptions, (error, response, body) => {
              if (error) {
                res.json({ error: "Unable to check timer, error occurred."});
              }
              console.log(response.body);
                res.json({ message: `${body}`})
            })
          })
          .catch(err => {
            res.json({ error: "We went wrong on findByEmail()... sorry."});
          })
        })
        .catch(err => {
          res.json({ error: "We went wrong on findByUserId()... sorry"})
        })
        
        
      } else

    if (reqBody.command === "/stop") {
      let userId = reqBody.user_id;
      dbSlack
      .findByUserId(userId)
      .then(user => {
        let userToken = user.accessToken;
        
        console.log("Retrieved the user, which looks like: ", user);
        dbUsers
        .findByEmail(user.userEmail)
        .then(user => {
          let id = user.id;
          console.log("Retrieved the user ID, which looks like: ", id);
          let postOptions = {
            uri: `https://focustimer-labs11.herokuapp.com/api/timer/stopTimer/${id}`,
            // uri: `http://localhost:8000/api/timer/stopTimer/${id}`,
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userToken}`
            }        
          };
          console.log("Here's what the uri looks like: ", postOptions.uri);
          changeUserStatusToBlank(userToken);
          request(postOptions, (error, response, body) => {
            if (error) {
              res.status(500).json({ error: "Unable to stop timer, error occurred."});
            }
            res.status(200).json(`${body}`)
            
          })
        })
        .catch(err => {
          res.status(500).json({ error: "We went wrong on findByEmail()... sorry."});
        })
      })
      .catch(err => {
        res.status(500).json({ error: "We went wrong on findByUserId()... sorry"})
      })
      
      
    } else
    
      // This is the endpoint for the slash command that enters a user
      // into Focus Time

    if (command === "/focus" || "/short" || "/long") {
      // let userToken = reqBody.token;
      let command = reqBody.command;
      let userId = reqBody.user_id;
      dbSlack
      .findByUserId(userId)
      .then(user => {
        let userToken = user.accessToken;
        // let slackUser = user;
        // console.log("Retrieved the user, which looks like: ", user);
        dbUsers
        .findByEmail(user.userEmail)
        .then(user => {
          let id = user.id;
          changeUserStatusToFocus(userToken);
          // console.log("Retrieved the user ID, which looks like: ", id);
          let postOptions = {
            uri: `https://focustimer-labs11.herokuapp.com/api/timer/startTimer/${id}${reqBody.command}`,
            // uri: `http://localhost:8000/api/timer/startTimer/${id}${command}`,
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userToken}`
            }        
          };
          // console.log("Here's what the uri looks like: ", postOptions.uri);
          request(postOptions, (error, response, body) => {
            if (error) {
              res.json({ error: "Unable to focus, error occurred."});
            }
            res.send(body);
            
          })
        })
        .catch(err => {
          res.json({ error: "We went wrong on findByEmail()... sorry."});
        })
      })
      .catch(err => {
        res.json({ error: "We went wrong on findByUserId()... sorry"})
      })
      
      
    } else {
      res.status(500).json({ error: "I'm sorry, I don't understand your command."});
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