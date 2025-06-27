const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [{
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
        altImage: '',
        symbolism: ['Community', 'Music', 'Joy'],
    },
    {
        name: 'Kokopelli Hoodie – Black',
        description: 'Black variant of our Kokopelli collage hoodie for a bold streetwear look.',
        price: 65,
        category: 'Hoodies',
        image: 'https://res.cloudinary.com/dhm8ttqnk/image/upload/f_auto/v1750972977/kokopelli-hoodie2_bsykez.png',
        sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        colors: ['Black'],
        countInStock: 25,
        isFeatured: false,
        material: 'Cotton/Poly blend',
    },
    {
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
        name: 'Positive Vibes Fitted Cap',
        description: 'Structured fitted cap embroidered with Positive Vibe Tribe glyph.',
        price: 35,
        category: 'Caps',
        image: 'https://res.cloudinary.com/dhm8ttqnk/image/upload/f_auto/v1750973272/positive-vibes-cap_s8gzhk.heic',
        sizes: ['S/M', 'L/XL'],
        colors: ['Black'],
        countInStock: 50,
    }
];

(async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Mongo');

        for (const prod of products) {
            await Product.findOneAndUpdate({ name: prod.name }, prod, { upsert: true, new: true });
            console.log(`Upserted: ${prod.name}`);
        }

        console.log('Seeding complete');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();