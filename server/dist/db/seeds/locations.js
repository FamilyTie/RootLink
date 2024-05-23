"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const Location_1 = require("../models/Location"); // Adjust the path according to your project structure
async function seed(knex) {
    // Deletes ALL existing entries
    await knex('locations').del();
    const locationsData = [
        { profile_id: 1, lat: 40.712776, lon: -74.005974 },
        { profile_id: 2, lat: 40.713776, lon: -74.004974 },
        { profile_id: 3, lat: 40.714776, lon: -74.003974 },
        { profile_id: 4, lat: 40.715776, lon: -74.002974 },
        { profile_id: 5, lat: 40.716776, lon: -74.001974 },
        { profile_id: 6, lat: 40.717776, lon: -74.000974 },
        { profile_id: 7, lat: 40.718776, lon: -73.999974 },
        { profile_id: 8, lat: 40.719776, lon: -73.998974 },
        { profile_id: 9, lat: 40.720776, lon: -73.997974 },
        { profile_id: 10, lat: 40.721776, lon: -73.996974 },
    ];
    for (const locationData of locationsData) {
        try {
            await Location_1.Location.create(locationData);
            console.log(`Seeded location for profile_id: ${locationData.profile_id}`);
        }
        catch (error) {
            console.error(`Error seeding location for profile_id: ${locationData.profile_id}`, error);
        }
    }
}
exports.seed = seed;
