const express = require('express');
const request = require('request');

const db = require('../../data/dbslackUserModel.js');

const router = express.Router();

//! this needs to match the endpoint on the bot - temp name below via ngrok
let uri = "https://9aa2f1bf.ngrok.io/api/slackusers";

router.get('/', (req, res) => {
    const uriUpdate = {
        uri: `https://slack.com/api/oauth.access?code=${req.query.code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${uri}`,
        method: "GET"
    };
    //! works with out bot running
    request(uriUpdate, (error, response, body) => {
        let reqResponse = JSON.parse(body);
        console.log(reqResponse);
        console.log({ state: req.query.state });
        //! sample return
        //! state can be used to transfer user identifier
        /* 
        { 
            ok: true,
            access_token:
            'xoxp-586899066608-580596701633-586917596384-235876421f42889f27c0669d3710b18a',
            scope: 'identify,bot,commands,incoming-webhook',
            user_id: 'UH2HJLMJM',
            team_name: 'Labs11 Pomodoro WS',
            team_id: 'TH8SF1YHW',
            incoming_webhook:
            { channel: '#general',
                channel_id: 'CH8SF269E',
                configuration_url: 'https://labs11pomodorows.slack.com/services/BHAFQ92U8',
                url:
                'https://hooks.slack.com/services/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' },
            bot:
            { bot_user_id: 'UH2J39X89',
                bot_access_token: 'xoxb-586899066608-580615337281-zFqtz55PRT5FDUjwpaeZiB4G' } 
        }
        {
            state: ''
        } */
        
    })
    // db
    //     .find()
    //     .then(slackUsers => {
    //         res.status(200).json(slackUsers);
    //     })
    //     .catch(err => res.status(500).json(err));
});

module.exports = router;