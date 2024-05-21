"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAutoCompleteLocations = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchAutoCompleteLocations = async (req, res) => {
    try {
        const response = await axios_1.default.get('https://api.locationiq.com/v1/autocomplete.php', {
            params: {
                key: process.env.LOC_API_KEY, // Replace with your actual API key
                q: req.query.q,
                format: 'json',
                limit: 5
            }
        });
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from LocationIQ' });
    }
};
exports.fetchAutoCompleteLocations = fetchAutoCompleteLocations;
