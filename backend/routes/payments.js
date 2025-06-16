var express = require('express');
var router = express.Router();
var stripeSecret = process.env.STRIPE_SECRET_KEY;
var stripe = stripeSecret ? require('stripe')(stripeSecret) : null;

// POST /api/payments/create-intent
router.post('/create-intent', function(req, res, next) {
    if (!stripe) {
        return res.status(500).json({ message: 'Stripe not configured' });
    }
    var total = req.body.amount;
    stripe.paymentIntents
        .create({ amount: total, currency: 'usd' })
        .then(function(intent) {
            res.json({ clientSecret: intent.client_secret });
        })
        .catch(next);
});

module.exports = router;