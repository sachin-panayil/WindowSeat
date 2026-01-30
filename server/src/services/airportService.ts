import { Airport } from "../types/Airport";
import { ApiNinjasResponse } from "../types/ApiNinjasResponse";
import dotenv from 'dotenv'
dotenv.config();

const baseAirportEndpoint = "https://api.api-ninjas.com/v1/airports?iata="
const apiKey = process.env.API_NINJAS_API_KEY

export async function getAirport(iata: string): Promise<Airport | null>  {
    const endpoint = baseAirportEndpoint + iata

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: {
            'X-Api-Key': `${apiKey}`,
            'Content-Type': 'application/json'
        },
        signal: controller.signal
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Airport service error: ${response.status}`);
        }

        const rawData = (await response.json()) as ApiNinjasResponse[]

        if (rawData.length === 0) {
            throw new Error(`Airport not found: ${iata}`)
        }

        const airport: Airport = {
            icao: rawData[0].icao,
            iata: rawData[0].iata,
            name: rawData[0].name,
            city: rawData[0].city,
            country: rawData[0].country,
            latitude: parseFloat(rawData[0].latitude),
            longitude: parseFloat(rawData[0].longitude),
            timezone: rawData[0].timezone,
        };

        return airport;
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Airport lookup timed out. Please try again.');
        }
        
        console.error("Fetch error:", error);
        throw error;
    }
}
