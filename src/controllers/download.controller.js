const resolverService = require('../services/resolver.service');
const { sendResponse } = require('../utils/response');

/**
 * Handles link extraction requests for movies and TV shows
 */
const extractMovieLinks = async (req, res) => {
    const { id } = req.params;
    const url = `https://vidvault.ru/movie/${id}`;

    try {
        const data = await resolverService.extractVidvaultLinks(url);
        return sendResponse(res, true, data);
    } catch (error) {
        return sendResponse(res, false, null, error.message, 500);
    }
};

const extractTvLinks = async (req, res) => {
    const { id, season, episode } = req.params;
    const url = `https://vidvault.ru/tv/${id}/${season}/${episode}`;

    try {
        const data = await resolverService.extractVidvaultLinks(url);
        return sendResponse(res, true, data);
    } catch (error) {
        return sendResponse(res, false, null, error.message, 500);
    }
};

module.exports = {
    extractMovieLinks,
    extractTvLinks
};
