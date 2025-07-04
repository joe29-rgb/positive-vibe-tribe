var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    sizes: [String],
    colors: [String],
    countInStock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    material: { type: String },
    altImage: { type: String },
    symbolism: [String],
    culturalSignificance: [String],
    artStyle: { type: String },
    impactLevel: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);