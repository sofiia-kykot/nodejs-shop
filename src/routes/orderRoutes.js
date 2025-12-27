const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// Home page shows all orders
router.get('/', OrderController.index);
router.get('/orders/create', OrderController.create);
router.post('/orders', OrderController.store);
router.get('/order/:id', OrderController.show);

module.exports = router;