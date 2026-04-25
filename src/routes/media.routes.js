const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/media.controller');

/**
 * Placeholder routes for media discovery
 */
router.get('/trending', mediaController.getTrending);

module.exports = router;
