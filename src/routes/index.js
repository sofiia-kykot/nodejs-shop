const express = require('express');
const orderRoutes = require("./orderRoutes");
const statsRoutes = require("./statsRoutes");
const router = express.Router();

router.use('/', orderRoutes);
router.use('/stats', statsRoutes);

module.exports = router;