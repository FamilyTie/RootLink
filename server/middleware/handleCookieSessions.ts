const cookieSession = require('cookie-session');
export const handleCookieSessions = cookieSession({
  name: 'session',
  secret: process.env.SESSION_SECRET ,
  keys: ['key1', 'key2'],
  maxAge: 1000 * 60 * 60 * 24  // 24 hours
});

