const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/download.controller');

/**
 * Route definitions for extraction service
 */
router.get('/movie/:id', downloadController.extractMovieLinks);
router.get('/tv/:id/:season/:episode', downloadController.extractTvLinks);

module.exports = router;
