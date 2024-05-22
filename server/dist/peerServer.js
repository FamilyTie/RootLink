"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const PeerServer = require('peer').PeerServer;
const server = PeerServer({
    port: 9000,
    path: '/peerjs',
    ssl: {
        key: fs_1.default.readFileSync('./../certificates/key.pem', 'utf8'),
        cert: fs_1.default.readFileSync('./../certificates/cert.pem', 'utf8')
    }
});
