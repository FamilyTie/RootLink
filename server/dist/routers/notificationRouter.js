"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const express_1 = __importDefault(require("express"));
const notificationController_1 = require("../controllers/notificationController");
exports.notificationRouter = express_1.default.Router();
exports.notificationRouter.post("/", notificationController_1.createNotification);
exports.notificationRouter.get("/:profileId", notificationController_1.getNotifications);
exports.notificationRouter.get("/sent/:profileId", notificationController_1.listSentNotifications);
exports.notificationRouter.put("/:notificationId", notificationController_1.updateNotification);
exports.notificationRouter.delete("/:notificationId", notificationController_1.deleteNotification);
