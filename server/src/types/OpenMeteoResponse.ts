export interface OpenMeteoResponse {
    hourly?: {
        time?: string[];
        cloud_cover?: number[];
    };
}