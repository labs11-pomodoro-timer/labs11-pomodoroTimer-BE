require("dotenv").config();

const express = require("express");
const request = require("request");
const router = express.Router();

const db = require("../../data/dbslackUserModel.js");

//! this needs to match the endpoint on the bot - temp name below via ngrok
// let uri = "https://cbaa2023.ngrok.io/api/slackusers/user/add";
let uri = "https://focustimer-labs11.herokuapp.com/api/slackusers/user/add";

router.get("/", (req, res) => {
  // res.status(200).json({ slackUsers: 'alive' });
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

// add slackuser info
router.get("/user/add", async (req, res) => {
  // check user table for user via email
  const validUser = await db.getUser(req.query.state);
  // build the redirect
  const uriUpdate = await {
    uri: `https://slack.com/api/oauth.access?code=${req.query.code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${uri}`,
    method: "GET"
  };
  // check if user is already in slack table
  const slackUser = await db.findByEmail(req.query.state);
  // if user is not in user table -> forward to registration page
  if(!validUser) {
    res.status(404).json({ message: "this page should load our registration page" });
  } else {
    request(uriUpdate, (error, response, body) => {
      let reqResponse = JSON.parse(body);
      if (!reqResponse.ok) {
        res.send(`Error: ${JSON.stringify(reqResponse)}`).status(404).end();
      } else {
        let slackUserInfo = {
          accessToken: reqResponse.access_token,
          userId: reqResponse.user_id,
          teamName: reqResponse.team_name,
          teamId: reqResponse.team_id,
          botUserId: reqResponse.bot.bot_user_id,
          botAccessToken: reqResponse.bot.bot_access_token,
          userEmail: validUser.email
        };
        // if user in slack already -> update user instead of add new
        if(slackUser) {
          db.update(slackUser.id, slackUserInfo)
            .then(count => {
              if(count) {
                res.status(200).redirect("https://focustimer.now.sh/");
              } else {
                res.status(404).json({ message: 'user not found' });
              }
            })
            .catch(`Error: ${res}`);
        } else {
          db.add(slackUserInfo)
            .then(() => {
              res.redirect("https://focustimer.now.sh/");
            })
            .catch(`Error: ${res}`);
        }
      }
    });
  }
});

// this is for testing with postman
// router.post("/add", async (req, res) => {
//   try {
//     const userData = req.body;
//     const userId = await db.add(userData);
//     const user = await db.findById(userId[0]);
//     res.status(201).json(user);
//   } catch (error) {
//     let message = "error adding the user";

//     res.status(500).json({ message, error });
//   }
// });

// GET Slack User by email
router.get("/:email", (req, res) => {
  const { email } = req.params;
  db.findByEmail(email)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ message: `User with ${email} could not be found.` }));
});

// this is for testing with postman
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} user(s) updated` });
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "thats our bad", err });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(count => {
      if (count < 1) {
        res.status(404).json({ message: "please try a valid user" });
      } else {
        res.status(200).json({ message: "user has been deleted" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting user", err });
    });
});

module.exports = router;
