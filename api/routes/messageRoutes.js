const express = require("express");
const router = express.Router();

const db = require("../../data/dbModel");

// message-based endpoints here6485

router.get('/start/:id', async (req, res) => {
    const { id } = req.params;
    const user = await db.findById(id);
    res.status(200).json({ message: `${user.firstname} is starting a timer...` })
})

router.get('/focus/:id', async (req, res) => {
    const { id } = req.params;
    const user = await db.findById(id);
    const currentTime = Date.now();
    const timeleft = Math.floor((user.timerEnd - currentTime) / (1000 * 60));

    res.status(200).json({ message: `${user.firstname} is in Focus Time for ${timeleft} minutes...` })
})

router.get('/short/:id', async (req, res) => {
    const { id } = req.params;
    const user = await db.findById(id);
    res.status(200).json({ message: `${user.firstname} is on a shortbreak...` })
})

router.get('/long/:id', async (req, res) => {
    const { id } = req.params;
    const user = await db.findById(id);
    res.status(200).json({ message: `${user.firstname} is on a longbreak...` })
})

router.get('/status/:id', async (req, res) => {
    const { id } = req.params;
    const user = await db.findById(id);
    res.status(200).json({ message: `${user.firstname} is currently in ${user.timerName} timer mode...` })
})

module.exports = router;