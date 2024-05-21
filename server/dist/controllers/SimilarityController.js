"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimilarProfiles = void 0;
const MLModel_1 = require("../micro-services/MLModel");
const getSimilarProfiles = async (req, res) => {
    const { user } = req.body;
    try {
        const matches = await (0, MLModel_1.processProfileAndFindMatches)(user);
        res.send(matches);
    }
    catch (error) {
        res.status(500).send(`Error fetching search results: ${error.message}`);
    }
};
exports.getSimilarProfiles = getSimilarProfiles;
