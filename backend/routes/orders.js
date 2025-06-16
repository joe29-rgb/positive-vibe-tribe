var express = require('express');
var router = express.Router();
var Order = require('../models/Order');

// POST /api/orders
router.post('/', function (req, res, next) {
  var order = new Order(req.body);
  order
    .save()
    .then(function (saved) {
      res.status(201).json(saved);
    })
    .catch(next);
});

// GET /api/orders/:id
router.get('/:id', function (req, res, next) {
  Order.findById(req.params.id)
    .then(function (order) {
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    })
    .catch(next);
});

module.exports = router;
