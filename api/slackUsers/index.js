const express = require('express');
const request = require('request');

const db = require('../../data/dbslackUserModel.js');

const router = express.Router();

//! this needs to match the endpoint on the bot - temp name below via ngrok
// let uri = "https://be5b42b8.ngrok.io/api/slackusers";
let uri = "https://focustimer-labs11.herokuapp.com/api/slackusers";

router.get('/', (req, res) => {
    const uriUpdate = {
        uri: `https://slack.com/api/oauth.access?code=${req.query.code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${uri}`,
        method: "GET"
    };
    //! works with out bot running
    request(uriUpdate, (error, response, body) => {
        let reqResponse = JSON.parse(body);
        // console.log(reqResponse);
        // console.log({ state: req.query.state });
        
        // check for response status
        if (!reqResponse.ok) {
            res.send(`Error: ${JSON.stringify(reqResponse)}`).status(200).end();
        } else {
            // need to bring something along in state to create the connection between tables
            let slackUserInfo = {
                accessToken: reqResponse.access_token,
                userId: reqResponse.user_id,
                teamName: reqResponse.team_name,
                teamId: reqResponse.team_id,
                botUserId: reqResponse.bot.bot_user_id,
                botAccessToken: reqResponse.bot.bot_access_token,
                userEmail: 'member email', // item coming from state
                channelId: reqResponse.incoming_webhook.channel_id
            }
            // need to add information into the database
            db.add(slackUserInfo).then(() => {
                res.redirect("https://focustimer.now.sh/");
            }).catch(`Error: ${res}`)
        }
        
        
    })
    // db
    //     .find()
    //     .then(slackUsers => {
    //         res.status(200).json(slackUsers);
    //     })
    //     .catch(err => res.status(500).json(err));
});

module.exports = router;