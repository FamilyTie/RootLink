

import { Knex } from 'knex';
import { Location } from '../models/Location'; // Adjust the path according to your project structure

export async function seed(knex: Knex): Promise<void> {
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
    await Location.create(locationData);
  }
}