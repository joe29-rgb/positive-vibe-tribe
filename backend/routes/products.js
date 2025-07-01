var express = require('express');
var router = express.Router();
var Product = require('../models/Product');

// --- In-memory sample product data (used when DB is unavailable or has no products) ---
var sampleProducts = [{
        _id: 'pvt-101',
        name: 'Kokopelli Hoodie – Grey',
        description: 'Cozy fleece hoodie featuring the iconic Kokopelli collage graphic in warm sunset hues.',
        price: 65,
        category: 'Hoodies',
        image: 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750972974/kokopelli-hoodie_rpckb8.png',
        sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        colors: ['Grey'],
        countInStock: 25,
        isFeatured: true,
        material: 'Cotton/Poly blend',
        symbolism: ['Community', 'Music', 'Joy'],
    },
    {
        _id: 'pvt-102',
        name: 'Kokopelli Hoodie – Black',
        description: 'Black variant of our Kokopelli collage hoodie for a bold streetwear look.',
        price: 65,
        category: 'Hoodies',
        image: 'https://res.cloudinary.com/dhm8ttqnk/image/upload/f_auto/v1750972977/kokopelli-hoodie2_bsykez.png',
        sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        colors: ['Black'],
        countInStock: 25,
        material: 'Cotton/Poly blend',
    },
    {
        _id: 'pvt-103',
        name: 'Sunset Gradient Tee',
        description: 'Soft tee with Positive Vibe Tribe wordmark over a sunset gradient.',
        price: 30,
        category: 'Tees',
        image: 'https://res.cloudinary.com/dhm8ttqnk/image/upload/f_auto/v1750972975/sunset-tee_etsimr.jpg',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        colors: ['Sunset'],
        countInStock: 40,
        isFeatured: true,
    },
    {
        _id: 'pvt-104',
        name: 'Zen Waves Tank',
        description: 'Lightweight tank featuring calming wave artwork and Kokopelli icon.',
        price: 28,
        category: 'Tanks',
        image: 'https://res.cloudinary.com/dhm8ttqnk/image/upload/f_auto/v1750795961/IMG_20250624_140103_g6rpuj.heic',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White'],
        countInStock: 30,
    },
    {
        _id: 'pvt-105',
        name: 'Positive Vibes Fitted Cap',
        description: 'Structured fitted cap embroidered with Positive Vibe Tribe glyph.',
        price: 35,
        category: 'Caps',
        image: 'https://res.cloudinary.com/dhm8ttqnk/image/upload/f_auto/v1750973272/positive-vibes-cap_s8gzhk.heic',
        sizes: ['S/M', 'L/XL'],
        colors: ['Black'],
        countInStock: 50,
    },
];
// -----------------------------------------------------------------------------

// GET /api/products
router.get('/', async function(req, res) {
    try {
        var query = {};
        if (req.query.tag === 'new') {
            query.createdAt = { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }; // last 30 days
        }
        if (req.query.tag === 'featured') {
            query.isFeatured = true;
        }

        var limit = parseInt(req.query.limit, 10) || 0;

        // Attempt to fetch from MongoDB
        var products = [];
        try {
            products = await Product.find(query).sort({ createdAt: -1 }).limit(limit);
        } catch (dbErr) {
            // swallow DB error and fall back to sample data
            console.error('DB fetch error, serving sample products:', dbErr.message || dbErr);
        }

        if (products && products.length) {
            return res.json(products);
        }

        // No products found or DB failed – serve in-memory sample data
        var fallback = limit ? sampleProducts.slice(0, limit) : sampleProducts;
        return res.json(fallback);
    } catch (err) {
        console.error('Unexpected error serving products:', err.message || err);
        return res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/products/:id
router.get('/:id', async function(req, res) {
    try {
        var product = null;
        try {
            product = await Product.findById(req.params.id);
        } catch (dbErr) {
            console.error('DB fetch error for single product:', dbErr.message || dbErr);
        }

        if (product) {
            return res.json(product);
        }

        var sample = sampleProducts.find(function(p) { return p._id === req.params.id; });
        if (sample) {
            return res.json(sample);
        }
        return res.status(404).json({ message: 'Product not found' });
    } catch (err) {
        console.error('Unexpected error serving single product:', err.message || err);
        return res.status(500).json({ message: 'Server Error' });
    }
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
module.exports.sampleProducts = sampleProducts;