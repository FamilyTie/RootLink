"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthentication = void 0;
// Is the user logged in?
// Not specific user, just ANY user
const checkAuthentication = (req, res, next) => {
    const { userId } = req.session;
    if (!userId) {
        return res.sendStatus(401);
    }
    return next();
};
exports.checkAuthentication = checkAuthentication;
