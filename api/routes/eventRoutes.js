require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const request = require("request");

router.post("/", (req, res) => {
    const reqBody = req.body;
    console.log(reqBody);
})