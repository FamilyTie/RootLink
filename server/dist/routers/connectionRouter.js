"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionRouter = void 0;
const express_1 = __importDefault(require("express"));
const connectionController_1 = require("../controllers/connectionController");
exports.connectionRouter = express_1.default.Router();
exports.connectionRouter.get("/:profileId", connectionController_1.getConnections);
exports.connectionRouter.post("/", connectionController_1.createConnection);
exports.connectionRouter.post("/request", connectionController_1.requestConnection);
exports.connectionRouter.delete("/", connectionController_1.removeConnection);
