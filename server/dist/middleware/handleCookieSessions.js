"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCookieSessions = void 0;
const cookieSession = require('cookie-session');
exports.handleCookieSessions = cookieSession({
    name: 'session',
    secret: process.env.SESSION_SECRET,
    // By default, the cookie's lifetime is "session"
    // which means until we close the browser. We like this for now!
    // But in real life you'd set the cookie to expire,
    // and implement an auto re-auth flow, but that's too much at this point.
    keys: ['key1', 'key2'],
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
});
