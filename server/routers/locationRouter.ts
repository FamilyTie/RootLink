const express = require("express")

import {
    createLocation,
    getLocations,
    getLocationById
} from "../controllers/locationController"
import { fetchAutoCompleteLocations } from "../utils/api-fetches"


export const locationRouter = express.Router()


locationRouter.get("/", getLocations)
locationRouter.get("/:locationId", getLocationById)
locationRouter.post("/", createLocation)
locationRouter.get("/:locationId", getLocationById)
