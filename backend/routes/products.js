var express = require('express');
var router = express.Router();
var Product = require('../models/Product');

// GET /api/products
router.get('/', function(req, res, next) {
    var query = {};
    if (req.query.tag === 'new') {
        query.createdAt = { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }; // last 30 days
    }
    if (req.query.tag === 'featured') {
        query.isFeatured = true;
    }

    var limit = parseInt(req.query.limit, 10) || 0;

    Product.find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .then(function(products) {
            res.json(products);
        })
        .catch(next);
});

// GET /api/products/:id
router.get('/:id', function(req, res, next) {
    Product.findById(req.params.id)
        .then(function(product) {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        })
        .catch(next);
});

// POST /api/products
router.post('/', function(req, res, next) {
    var newProduct = new Product(req.body);
    newProduct
        .save()
        .then(function(product) {
            res.status(201).json(product);
        })
        .catch(next);
});

// PUT /api/products/:id
router.put('/:id', function(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(function(product) {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        })
        .catch(next);
});

// DELETE /api/products/:id
router.delete('/:id', function(req, res, next) {
    Product.findByIdAndDelete(req.params.id)
        .then(function(product) {
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product removed' });
        })
        .catch(next);
});

module.exports = router;