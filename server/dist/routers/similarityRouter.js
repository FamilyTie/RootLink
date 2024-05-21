"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.similarityRouter = void 0;
const express_1 = __importDefault(require("express"));
const SimilarityController_1 = require("../controllers/SimilarityController");
exports.similarityRouter = express_1.default.Router();
exports.similarityRouter.get('/', SimilarityController_1.getSimilarProfiles);
