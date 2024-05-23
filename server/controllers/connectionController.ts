import {Request, Response} from 'express';
import { Connection } from '../db/models/Connections';




export const createConnection = async (req: Request, res: Response) => {
    try {
        const { profile_id1, profile_id2 } = req.body
        const newConnection = await Connection.create({profile_id1, profile_id2})
        res.status(201).json(newConnection)
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create connection", error: error.toString() })
    }
}

export const requestConnection = async (req: Request, res: Response) => {
    try {
        const { profile_id1, profile_id2 } = req.body
        const connection = await Connection.requestConnection(profile_id1, profile_id2)
        res.status(201).json(connection)
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to request connection", error: error.toString() })
    }
}

export const removeConnection = async (req: Request, res: Response) => {
    try {
        const { profile_id1, profile_id2 } = req.body
        await Connection.removeConnection(profile_id1, profile_id2)
        res.status(201).json({ message: "Connection removed" })
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to remove connection", error: error.toString() })
    }
}

export const getConnections = async (req: Request, res: Response) => {
    try {
        const connections = await Connection.listByProfileId(Number(req.params.profileId))
        res.send(connections)
    } catch (error) {
        console.error("Failed to fetch connections:", error)
        res
            .status(500)
            .json({ message: "Failed to fetch connections", error: error.toString() })
    }
}