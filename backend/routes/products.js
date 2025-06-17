var express = require('express');
var router = express.Router();
var Product = require('../models/Product');

// --- In-memory sample product data (used when DB is unavailable or has no products) ---
var sampleProducts = [{
        _id: 'pvt-001',
        name: 'Positive Vibes Sunset Tee',
        description: 'Ultra-soft cotton tee featuring a vibrant desert sunset graphic that radiates positivity.',
        price: 29.99,
        category: 'tops',
        image: 'https://images.unsplash.com/photo-1618354691373-2ad4a95f2993?auto=format&fit=crop&w=800&q=80',
        altImage: 'https://images.unsplash.com/photo-1618354691806-f6213fa9d506?auto=format&fit=crop&w=800&q=80',
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Organic Cotton',
        colors: ['#fdd835', '#ff6f00'],
        symbolism: ['sunset', 'positivity'],
        countInStock: 50,
        isFeatured: true,
    },
    {
        _id: 'pvt-002',
        name: 'Kokopelli Hoodie',
        description: 'Cozy fleece hoodie emblazoned with the iconic Kokopelli to keep good vibes flowing.',
        price: 59.99,
        category: 'outerwear',
        image: 'https://images.unsplash.com/photo-1600180758895-2a3fe8c3c6e4?auto=format&fit=crop&w=800&q=80',
        altImage: 'https://images.unsplash.com/photo-1600180758975-0d9c1f1bd395?auto=format&fit=crop&w=800&q=80',
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Fleece',
        colors: ['#5d4037', '#bf360c'],
        symbolism: ['kokopelli', 'music'],
        countInStock: 40,
    },
    {
        _id: 'pvt-003',
        name: 'Desert Dusk Cap',
        description: 'Six-panel snapback featuring an embroidered desert horizon for endless adventure vibes.',
        price: 24.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1542060743-6b7bd4e15c7a?auto=format&fit=crop&w=800&q=80',
        altImage: 'https://images.unsplash.com/photo-1542060743-bb1d8b479249?auto=format&fit=crop&w=800&q=80',
        sizes: ['OS'],
        material: 'Canvas',
        colors: ['#6d4c41', '#ffab00'],
        symbolism: ['desert'],
        countInStock: 100,
    },
    {
        _id: 'pvt-004',
        name: 'Good Vibes Bracelet',
        description: 'Hand-woven paracord bracelet infused with gemstones that promote calm and balance.',
        price: 14.99,
        category: 'accessories',
        image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
        altImage: 'https://images.unsplash.com/photo-1522312346375-49c50c4b217c?auto=format&fit=crop&w=800&q=80',
        sizes: ['S', 'M', 'L'],
        material: 'Paracord',
        colors: ['#ff5252', '#ff9800', '#4caf50'],
        symbolism: ['balance'],
        countInStock: 200,
    },
    {
        _id: 'pvt-005',
        name: 'Trailblazer Joggers',
        description: 'Lightweight joggers built for movement with subtle Positive Vibes Tribe embroidery.',
        price: 49.99,
        category: 'bottoms',
        image: 'https://images.unsplash.com/photo-1600180758753-d9777084ff57?auto=format&fit=crop&w=800&q=80',
        altImage: 'https://images.unsplash.com/photo-1600180758858-a3bf3e57e1af?auto=format&fit=crop&w=800&q=80',
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'Poly-Cotton Blend',
        colors: ['#263238', '#607d8b'],
        symbolism: ['trailblazer'],
        countInStock: 60,
    },
    {
        _id: 'pvt-006',
        name: 'Zen Waves Tank',
        description: 'Flowy racerback tank with a minimal wave print—perfect for beachside meditation.',
        price: 27.99,
        category: 'tops',
        image: 'https://images.unsplash.com/photo-1551854838-77464c252f14?auto=format&fit=crop&w=800&q=80',
        altImage: 'https://images.unsplash.com/photo-1551854839-459238ada7a4?auto=format&fit=crop&w=800&q=80',
        sizes: ['XS', 'S', 'M', 'L'],
        material: 'Modal',
        colors: ['#00acc1', '#ffffff'],
        symbolism: ['zen', 'waves'],
        countInStock: 80,
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