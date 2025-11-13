import axios from "axios";
import type { FlightSearchParams, FlightData } from "../types/flight.types";

const TIMEOUT = 10000

const api = axios.create({
    baseURL: "'http://localhost:5000/api'",
    timeout: TIMEOUT
})

export const flightAPI = {
    searchFlights: async (params: FlightSearchParams): Promise<FlightData[]> => {
        try {
            console.log("Searching for flights with the params:", params)

            await new Promise(resolve => setTimeout(resolve, TIMEOUT))

            return [
                {
                    flightNumber: "AA1234",
                    route: "LAX → JFK",
                    origin: "LAX",
                    destination: "JFK",
                    departure_time: "8:30 AM",
                    arrival_time: "4:45 PM",
                    aircraft: "Boeing 737-800",
                    airline: "American Airlines",
                    duration: 315, 
                    date: "2025-01-15"
                  },
                  {
                    flightNumber: "DL567",
                    route: "SEA → MIA",
                    origin: "SEA",
                    destination: "MIA",
                    departure_time: "6:15 AM",
                    arrival_time: "2:30 PM",
                    aircraft: "Airbus A320",
                    airline: "Delta Airlines",
                    duration: 315,
                    date: "2025-01-16"
                  }
              ];
        } catch (error) {
            console.error("Flight search failed:", error)
            throw new Error("Unable to search flight. Please try again.")
        }
    }
}