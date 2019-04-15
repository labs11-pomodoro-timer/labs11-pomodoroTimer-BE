require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const request = require("request");

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

router.post("/", (req, res) => {
    const reqBody = req.body;
    console.log(reqBody);
})