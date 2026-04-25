const { sendResponse } = require('../utils/response');

/**
 * Placeholder for additional media metadata or discovery features
 */
const getTrending = async (req, res) => {
    return sendResponse(res, true, { message: "Media metadata service is coming soon" });
};

module.exports = {
    getTrending
};
