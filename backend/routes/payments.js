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

router.post('/create-session', async function(req, res, next) {
    if (!stripe) {
        return res.status(500).json({ message: 'Stripe not configured' });
    }
    try {
        const items = req.body.items || [];
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Cart items missing' });
        }
        // Build line items for Stripe
        const line_items = items.map(function(it) {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: { name: it.name },
                    unit_amount: Math.round(it.price * 100),
                },
                quantity: it.quantity,
            };
        });
        /**
         * Success & cancel URLs fall back to environment CLIENT_URL or localhost:3000
         */
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            success_url: req.body.successUrl || clientUrl + '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: req.body.cancelUrl || clientUrl + '/checkout/cancel',
            shipping_address_collection: { allowed_countries: ['US', 'CA'] },
        });
        res.json({ id: session.id, url: session.url });
    } catch (err) {
        next(err);
    }
});

module.exports = router;