const express = require("express");
const router = express.Router();
require('dotenv').config();

const stripe = require('stripe')(process.env.SECRETKEY);


// const {
//     serverErrorPost
//   } = require("./routeHelpers/helpers.js");


router.post('/subscription', (req, res) => {
    const stripeToken = req.body.stripeToken;
    const email = req.body.email;

    stripe.customers.create({
        email: email,
        source: stripeToken
    }, function(err, customer) {
        if(err) {
            res.status(404).json({ message: "Does not exist" })
        } else {
            const { id } = customer

            stripe.subscriptions.create({
                customer: id,
                items: [{plan: 'plan_EocCm500r7gb27'}],

            }, function(err, subscription) {
                if(err) {
                    res.status(404).json({ message: "error" })
                } else {
                    res.status(200).json({ subscription })
                        
                    
                }
            })
        }
    })
})

module.exports = router;