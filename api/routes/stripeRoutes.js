const express = require("express");
const router = express.Router();
require("dotenv").config();

const stripe = require("stripe")(process.env.SECRETKEY);

// const {
//     serverErrorPost
//   } = require("./routeHelpers/helpers.js");

router.post("/subscription", (req, res) => {
  const stripeToken = req.body.stripeToken;
  const email = req.body.email;

  stripe.customers.create(
    {
      email: email,
      source: stripeToken
    },
    function(err, customer) {
      if (err) {
        res.status(404).json({ message: "Does not exist" });
      } else {
        const { id } = customer;

        stripe.subscriptions.create(
          {
            customer: id,
            items: [{ plan: "plan_EocCm500r7gb27" }]
          },
          function(err, subscription) {
            if (err) {
              res.status(404).json({ message: "error" });
            } else {
              res.status(200).json({ subscription });
            }
          }
        );
      }
    }
  );
});

// Retrieve customer's status.
//"premium: true" is customer has active subscription
router.post("/customer/premium", (req, res) => {
  const { stripeId } = req.body;
  if (!stripeId) {
    res.status(402).send({ err: `${id} is missing` });
  }
  stripe.customers.retrieve(id, function(err, customer) {
    if (err) {
      return res.status(500).send({ err });
    }
    if (customer) {
      if (customer.deleted) {
        return res.status(404).send({
            message: 'No subscription found',
            premium: false
          });
      } else {
        return res.status(200).send({
            stripeId: customer.id,
            customer: customer.subscriptions.data[0].items.data[0].plan,
            premium: true
          });
      }
    }
  });
});

module.exports = router;
