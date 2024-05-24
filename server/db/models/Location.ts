import {knex} from '../knex'

interface LocationData {
    id?: number
    profile_id: number
    lat: number
    lon: number
    created_at?: Date
}


export class Location {
    id?: number
    profile_id: number
    lat: number
    lon: number
    createdAt: Date

    constructor(data: LocationData) {
        this.id = data.id
        this.profile_id = data.profile_id
        this.lat = data.lat
        this.lon = data.lon
        this.createdAt = data.created_at || new Date()
    }

    static async list() {
        const query = `
            SELECT 
                locations.*, 
                profiles.img AS profile_img, 
                profiles.username AS profile_username
            FROM 
                locations
            JOIN 
                profiles ON locations.profile_id = profiles.id
        `;
        const { rows } = await knex.raw(query);
        return rows.map((location: any) => ({
            ...new Location(location),
            profile_img: location.profile_img,
            profile_username: location.profile_username,
        }));
    }

    static async findById(id: number) {
        const query = `SELECT * FROM locations WHERE id = ?`
        const {rows} = await knex.raw(query, [id])
        const location = rows[0]
        return location ? new Location(location) : null
    }

    static async create(data: Omit<LocationData, "id">) {
        try {
            const query = `INSERT INTO locations (profile_id, lat, lon, created_at)
                      VALUES (?, ?, ?, ?) RETURNING *`
            const values = [
                data.profile_id,
                data.lat,
                data.lon,
                new Date()
            ]
            const {rows} = await knex.raw(query, values)
            return new Location(rows[0])
        } catch (error) {
            console.error('Error creating location:', error)
            return null
        }
    }

    static async update(data: LocationData) {
        try {
            const query = `UPDATE locations SET profile_id = ?, lat = ?, lon = ? WHERE id = ? RETURNING *`
            const values = [
                data.profile_id,
                data.lat,
                data.lon,
                data.id
            ]
            const {rows} = await knex.raw(query, values)
            return new Location(rows[0])
        } catch (error) {
            console.error('Error updating location:', error)
            return null
        }
    }

    static async delete(id: number) {
        try {
            const query = `DELETE FROM locations WHERE id = ?`
            await knex.raw(query, [id])
            return true
        } catch (error) {
            console.error('Error deleting location:', error)
            return false
        }
    }
}
