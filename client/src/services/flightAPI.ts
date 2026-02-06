import axios from "axios";
import type { FlightSearchParams, FlightRecommendation } from "../../../server/shared/types/flight.types";

export class APIError extends Error {
    code: string;
    retryable: boolean;
    
    constructor(message: string, code: string, retryable: boolean) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.retryable = retryable;
    }
}

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    timeout: 15000
})

export const flightAPI = {
    getRecommendation: async (params: FlightSearchParams): Promise<FlightRecommendation> => {
        try {
            console.log("Searching for flights with the params:", params)
            const response = await api.post('/recommendations', params)
            return response.data
        } catch (error) {
            console.error("Flight search failed:", error);
            
            if (axios.isAxiosError(error) && error.response?.data) {
                const data = error.response.data;
                
                if (data.code && typeof data.retryable === 'boolean') {
                    throw new APIError(
                        data.message || 'An error occurred',
                        data.code,
                        data.retryable
                    );
                }
                
                // Rate limit error from express-rate-limit
                if (error.response.status === 429) {
                    throw new APIError(
                        data.message || 'Too many requests. Please wait a moment.',
                        'RATE_LIMITED',
                        true
                    );
                }
            }
            
            // Network error or timeout
            if (axios.isAxiosError(error)) {
                if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                    throw new APIError(
                        'Request timed out. Please try again.',
                        'TIMEOUT',
                        true
                    );
                }
                
                if (!error.response) {
                    throw new APIError(
                        'Unable to connect to server. Please check your internet connection.',
                        'NETWORK_ERROR',
                        true
                    );
                }
            }
            
            // Fallback for unknown errors
            throw new APIError(
                'Something went wrong. Please try again.',
                'UNKNOWN_ERROR',
                true
            );
        }
    }
}
