var mongoose = require('mongoose');

var orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

var orderSchema = new mongoose.Schema(
  {
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    customerEmail: { type: String, required: true },
    status: { type: String, default: 'pending' },
    paymentIntentId: { type: String },
    shippingAddress: {
      address1: String,
      address2: String,
      city: String,
      postalCode: String,
      country: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
