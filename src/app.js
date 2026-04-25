const express = require('express');
const cors = require('cors');
const downloadRoutes = require('./routes/download.routes');
const mediaRoutes = require('./routes/media.routes');
const { sendResponse } = require('./utils/response');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/download', downloadRoutes);
app.use('/media', mediaRoutes);

// Health check
app.get('/health', (req, res) => {
    return sendResponse(res, true, { status: 'Server is healthy' });
});

// 404 Handler
app.use((req, res) => {
    return sendResponse(res, false, null, "Endpoint not found", 404);
});

module.exports = app;
