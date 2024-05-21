import {Request, Response} from 'express';
import { Location } from '../db/models/Location';


export const createLocation = async (req: Request, res: Response) => {
    try {
        const { lat, lon, profile_id } = req.body
        const newLocation = await Location.create({lat, lon, profile_id})
        res.status(201).json(newLocation)
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create location", error: error.toString() })
    }
}


export const getLocations = async (req: Request, res: Response) => {
    try {
        const locations = await Location.list()
        res.send(locations)
    } catch (error) {
        console.error("Failed to fetch locations:", error)
        res
            .status(500)
            .json({ message: "Failed to fetch locations", error: error.toString() })
    }
}


export const getLocationById = async (req: Request, res: Response) => {
    const locationId = req.params.locationId
    const location = await Location
        .findById(Number(locationId))
}

