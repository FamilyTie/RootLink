"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCookieSessions = void 0;
const cookieSession = require('cookie-session');
exports.handleCookieSessions = cookieSession({
    name: 'session',
    secret: process.env.SESSION_SECRET,
    keys: ['key1', 'key2'],
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
});
