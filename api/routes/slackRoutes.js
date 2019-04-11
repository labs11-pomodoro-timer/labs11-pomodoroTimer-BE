require("dotenv").config();

const express = require("express");
const request = require("request");
const router = express.Router();

const db = require("../../data/dbslackUserModel.js");
const userdb = require("../../data/dbModel");

//! this needs to match the endpoint on the bot - temp name below via ngrok
let uri = "https://cbaa2023.ngrok.io/api/slackusers/user/add";
// let uri = "https://focustimer-labs11.herokuapp.com/api/slackusers/user/add";

router.get("/", (req, res) => {
  // res.status(200).json({ slackUsers: 'alive' });
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

// this is for the slack button
router.get("/slackButton", (req, res) => {
  const options = {
    // place state here
    uri: `https://slack.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=bot,commands,channels:write,groups:write,mpim:write,im:write&redirect_uri=${uri}`,
    method: "GET"
  };
  request(options, (error, response, body) => {
    res.status(200).send(body);
    let options = JSON.parse(body);
    console.log({body});
    console.log({ state: req.query.state });
  });
});

//GET Slack User by ID
// router.get("/:id", (req, res) => {
//   const {id} = req.params;
//   db.findById(id)
//   .then(users => {
//     res.status(200).json(users);
//   })
//   .catch(err => res.status(500).json({message: `User with ${id} could not be found.`}));
// });

// add slackuser info
router.get("/user/add", async (req, res) => {
  const uriUpdate = await {
    uri: `https://slack.com/api/oauth.access?code=${req.query.code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${uri}`,
    method: "GET"
  };
  request(uriUpdate, (error, response, body) => {
    let reqResponse = JSON.parse(body);
    console.log(reqResponse);
    
    // check for response status
    if (!reqResponse.ok) {
      res
      .send(`Error: ${JSON.stringify(reqResponse)}`)
      .status(404)
      .end();
    } else {
      console.log({ state: req.query.state });
      // need to bring something along in state to create the connection between tables
      let slackUserInfo = {
        accessToken: reqResponse.access_token,
        userId: reqResponse.user_id,
        teamName: reqResponse.team_name,
        teamId: reqResponse.team_id,
        botUserId: reqResponse.bot.bot_user_id,
        botAccessToken: reqResponse.bot.bot_access_token,
        userEmail: req.query.state, // item coming from state
        channelId: "" // reqResponse.incoming_webhook.channel_id
      };
      // need to add information into the database
      db.add(slackUserInfo)
        .then(() => {
          res.redirect("https://focustimer.now.sh/");
        })
        .catch(`Error: ${res}`);
    }
  });
});

// this is for testing with postman
router.post("/add", async (req, res) => {
  try {
    const userData = req.body;
    const userId = await db.add(userData);
    const user = await db.findById(userId[0]);
    res.status(201).json(user);
  } catch (error) {
    let message = "error adding the user";

    res.status(500).json({ message, error });
  }
});

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
