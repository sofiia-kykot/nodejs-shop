const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/StatsController');

router.get('/sales-period', StatsController.getSalesPeriod);
router.post('/sales-period', StatsController.calculateSalesPeriod);
router.get('/categories', StatsController.getCategories);

module.exports = router;