var express = require('express');
var router = express.Router();
var Product = require('../models/Product');
var sampleProducts = require('./products').sampleProducts || [];

// GET /api/search?q=term
router.get('/', async function(req, res) {
    var q = (req.query.q || '').trim();
    if (!q) return res.status(400).json({ message: 'Missing query param q' });
    try {
        var regex = new RegExp(q, 'i');
        var dbResults = [];
        try {
            dbResults = await Product.find({
                $or: [{ name: regex }, { description: regex }, { category: regex }],
            }).limit(10);
        } catch (dbErr) {
            console.error('DB search error:', dbErr.message || dbErr);
        }
        if (dbResults && dbResults.length) {
            return res.json(dbResults);
        }
        // fallback to sample products
        var fallback = sampleProducts.filter(function(p) {
            return regex.test(p.name) || regex.test(p.description) || regex.test(p.category);
        });
        return res.json(fallback.slice(0, 10));
    } catch (err) {
        console.error('Search endpoint error:', err.message || err);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;