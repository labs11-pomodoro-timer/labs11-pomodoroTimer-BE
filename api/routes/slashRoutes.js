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

function ErrorRouteToWebsite(res) {
  res.send("You were not found in the user list, please visit https://focustimer.now.sh and register")
}
 

  

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
          res.json({ error: "An error has occurred."});
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
                res.send(response.body);
            })
          })
          .catch(err => {
            ErrorRouteToWebsite(res);
          })
        })
        .catch(err => {
          ErrorRouteToWebsite(res);
          })
        
        
      } else
      // slash command for stopping the timer
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
          
          request(postOptions, (error, response, body) => {
            if (error) {
              res.status(500).json({ error: "Unable to stop timer, error occurred."});
            }
            res.status(200).json(body)
            
          })
        })
        .catch(err => {
          ErrorRouteToWebsite(res);        
        })
      })
      .catch(err => {
        ErrorRouteToWebsite(res);      
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
        let slackEmail = user.userEmail;
        // console.log("Retrieved the user, which looks like: ", user);
        dbUsers
        .findByEmail(slackEmail)
        .then(user => {
          let id = user.id;
          
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
          ErrorRouteToWebsite(res);        
        })
      })
      .catch(err => {
        ErrorRouteToWebsite(res);      
      })
      
      
    } else {
      res.status(500).json({ error: "I'm sorry, I don't understand your command."});
    }
  });

module.exports = router;