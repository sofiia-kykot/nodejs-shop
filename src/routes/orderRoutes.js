const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.get('/', OrderController.index);
router.get('/orders/create', OrderController.create);
router.post('/orders', OrderController.store);
router.get('/order/:id', OrderController.show);
router.get('/order/:id/edit', OrderController.edit);
router.patch('/order/:id', OrderController.update);
router.delete('/order/:id', OrderController.delete);

module.exports = router;