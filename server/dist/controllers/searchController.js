"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const Search_1 = __importDefault(require("../db/models/Search"));
const search = async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }
    try {
        const results = await Search_1.default.search(query);
        res.send(results);
    }
    catch (error) {
        res.status(500).send(`Error fetching search results: ${error.message}`);
    }
};
exports.search = search;
