const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    });
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });
    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });
});
server.listen(6700, () => console.log("Server is running on port 6700"));
