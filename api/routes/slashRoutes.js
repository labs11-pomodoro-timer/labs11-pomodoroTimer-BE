require("dotenv").config();
const express = require("express");
const db = require("../../data/dbslackUserModel");
const request = require("request");
const bodyParser = require("body-parser");
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
        // handle errors as you see fit
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