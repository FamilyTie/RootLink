"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationById = exports.getLocations = exports.createLocation = void 0;
const Location_1 = require("../db/models/Location");
const createLocation = async (req, res) => {
    try {
        const { latitude, longitude, profile_id } = req.body;
        const newLocation = await Location_1.Location.create({ latitude, longitude, profile_id });
        res.status(201).json(newLocation);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create location", error: error.toString() });
    }
};
exports.createLocation = createLocation;
const getLocations = async (req, res) => {
    try {
        const locations = await Location_1.Location.list();
        res.send(locations);
    }
    catch (error) {
        console.error("Failed to fetch locations:", error);
        res
            .status(500)
            .json({ message: "Failed to fetch locations", error: error.toString() });
    }
};
exports.getLocations = getLocations;
const getLocationById = async (req, res) => {
    const locationId = req.params.locationId;
    const location = await Location_1.Location
        .findById(Number(locationId));
};
exports.getLocationById = getLocationById;
