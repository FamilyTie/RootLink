"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnections = exports.removeConnection = exports.requestConnection = exports.createConnection = void 0;
const Connections_1 = require("../db/models/Connections");
const createConnection = async (req, res) => {
    try {
        const { profile_id1, profile_id2 } = req.body;
        const newConnection = await Connections_1.Connection.create({ profile_id1, profile_id2 });
        res.status(201).json(newConnection);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create connection", error: error.toString() });
    }
};
exports.createConnection = createConnection;
const requestConnection = async (req, res) => {
    try {
        const { profile_id1, profile_id2 } = req.body;
        const connection = await Connections_1.Connection.requestConnection(profile_id1, profile_id2);
        res.status(201).json(connection);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to request connection", error: error.toString() });
    }
};
exports.requestConnection = requestConnection;
const removeConnection = async (req, res) => {
    try {
        const { profile_id1, profile_id2 } = req.body;
        await Connections_1.Connection.removeConnection(profile_id1, profile_id2);
        res.status(201).json({ message: "Connection removed" });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to remove connection", error: error.toString() });
    }
};
exports.removeConnection = removeConnection;
const getConnections = async (req, res) => {
    try {
        const connections = await Connections_1.Connection.listByProfileId(Number(req.params.profileId));
        res.send(connections);
    }
    catch (error) {
        console.error("Failed to fetch connections:", error);
        res
            .status(500)
            .json({ message: "Failed to fetch connections", error: error.toString() });
    }
};
exports.getConnections = getConnections;
