"use strict";
//router for search funcionality 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouter = void 0;
const express_1 = __importDefault(require("express"));
const searchController_1 = require("../controllers/searchController");
exports.searchRouter = express_1.default.Router();
exports.searchRouter.get('/', searchController_1.search);
