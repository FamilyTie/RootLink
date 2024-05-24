import express from 'express'


import {
    createConnection,
    requestConnection,
    removeConnection,
    getConnections
} from "../controllers/connectionController"

export const connectionRouter = express.Router()


connectionRouter.get("/:profileId", getConnections)
connectionRouter.post("/", createConnection)
connectionRouter.post("/request", requestConnection)
connectionRouter.delete("/", removeConnection)


