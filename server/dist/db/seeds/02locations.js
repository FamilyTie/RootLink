"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const Location_1 = require("../models/Location"); // Adjust the path according to your project structure
async function seed(knex) {
    // Deletes ALL existing entries
    await knex('locations').del();
    const locationsData = [
        { profile_id: 1, lat: 40.712776, lon: -74.005974 }, // New York City, NY
        { profile_id: 2, lat: 42.360082, lon: -71.058880 }, // Boston, MA
        { profile_id: 3, lat: 39.952583, lon: -75.165222 }, // Philadelphia, PA
        { profile_id: 4, lat: 39.290386, lon: -76.612190 }, // Baltimore, MD
        { profile_id: 5, lat: 38.907192, lon: -77.036873 }, // Washington, D.C.
        { profile_id: 6, lat: 40.735657, lon: -74.172363 }, // Newark, NJ
        { profile_id: 7, lat: 41.765804, lon: -72.673372 }, // Hartford, CT
        { profile_id: 8, lat: 41.823989, lon: -71.412834 }, // Providence, RI
        { profile_id: 9, lat: 41.308274, lon: -72.927879 }, // New Haven, CT
        { profile_id: 10, lat: 39.364285, lon: -74.422935 }, // Atlantic City, NJ
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
