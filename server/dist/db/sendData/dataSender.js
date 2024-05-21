"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Profile_1 = require("../models/Profile");
const BATCH_SIZE = 1000;
async function sendDataToPythonServer() {
    try {
        const batches = await (0, Profile_1.fetchInBatches)(BATCH_SIZE);
        for (const batch of batches) {
            try {
                const response = await axios_1.default.post('http://python-server-url/api/endpoint', {
                    profiles: batch
                });
                console.log('Data sent to Python server:', response.data);
            }
            catch (error) {
                console.error('Error sending data to Python server:', error);
            }
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
exports.default = sendDataToPythonServer;
