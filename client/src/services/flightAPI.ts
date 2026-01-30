import axios from "axios";
import type { FlightSearchParams, FlightRecommendation } from "../../../shared/types/flight.types";

const TIMEOUT = 20000

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    timeout: TIMEOUT
})

export const flightAPI = {
    getRecommendation: async (params: FlightSearchParams): Promise<FlightRecommendation> => {
        try {
            console.log("Searching for flights with the params:", params)
            const response = await api.post('/recommendations', params)
            return response.data
        } catch (error) {
            console.error("Flight search failed:", error)
            throw new Error("Unable to search flight. Please try again.")
        }
    }
}