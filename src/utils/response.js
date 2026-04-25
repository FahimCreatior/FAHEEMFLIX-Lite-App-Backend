/**
 * Standard API response formatter
 */
const sendResponse = (res, success, data = null, error = null, statusCode = 200) => {
    return res.status(statusCode).json({
        success,
        data,
        error,
        timestamp: new Date().toISOString()
    });
};

module.exports = { sendResponse };
