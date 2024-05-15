"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const handleCookieSessions_1 = require("./middleware/handleCookieSessions");
const logRoutes_1 = require("./middleware/logRoutes");
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const postRouter_1 = __importDefault(require("./routers/postRouter"));
const profileRouter_1 = require("./routers/profileRouter");
<<<<<<< HEAD
const cookie_parser_1 = __importDefault(require("cookie-parser"));
=======
const commentRouter_1 = __importDefault(require("./routers/commentRouter"));
>>>>>>> 9ae93a9541f8e05bcc68958129448a5fd6838487
const app = (0, express_1.default)();
// Middleware
app.use((0, cookie_parser_1.default)());
app.use(handleCookieSessions_1.handleCookieSessions); // Adds a session property to each request representing the cookie
app.use(logRoutes_1.logRoutes); // Print information about each incoming request
app.use(express_1.default.json()); // Parse incoming request bodies as JSON
app.use(express_1.default.static(path.join(__dirname, "../frontend/dist"))); // Serve static assets from the dist folder of the frontend
// Routers
app.use("/api", authRouter_1.default);
app.use("/api/users", userRouter_1.default);
app.use("/api/posts", postRouter_1.default);
app.use("/api/profiles", profileRouter_1.profileRouter);
app.use("/api/comments", commentRouter_1.default);
app.get(/^(?!\/api).*/, function (request, response) {
    response.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});
const port = process.env.PORT || 3761;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
