import { GeoPoint } from "../types/GeoPoint";
import { Weather } from '../types/Weather';
import { estimateTimeAtPoint, parseLocalDepartureToUtc } from "../utils/timeHelper";
import type { OpenMeteoResponse } from "../types/OpenMeteoResponse";

const OPEN_METEO_BASE = "https://api.open-meteo.com/v1/forecast";

// fetches cloud cover for each point along the flight path
// returns path with cloudCover data and plus metadata about data availability
export async function getRouteWeather(
    path: GeoPoint[],
    date: string,
    departureTime: string,
    originTimezone: string
): Promise<Weather> {
    
    const flightDate = new Date(date);
    const today = new Date();
    const daysUntilFlight = Math.ceil((flightDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const departureUtc = parseLocalDepartureToUtc(date, departureTime, originTimezone);
    
    if (daysUntilFlight > 16) { // max forecast we get data for
        return {
            path: path.map(point => ({
                ...point,
                estimatedTime: estimateTimeAtPoint(departureUtc, point.distanceFromOrigin ?? 0).toISOString()
            })),
            weatherAvailable: false,
            coverage: 0,
            reason: 'date_out_of_range'
        };
    }
    
    let successCount = 0;
    let totalApiError = true;
    
    const results = await Promise.all(
        path.map(async (point) => {
            const estimatedTime = estimateTimeAtPoint(departureUtc, point.distanceFromOrigin ?? 0);
            
            try {
                const cloudCover = await fetchCloudCover(
                    point.latitude,
                    point.longitude,
                    estimatedTime
                );
                
                successCount++;
                totalApiError = false;
                
                return {
                    ...point,
                    estimatedTime: estimatedTime.toISOString(),
                    cloudCover
                };
            } catch (error) {
                console.error(`Weather fetch failed for point at ${point.distanceFromOrigin} miles:`, error);
                return {
                    ...point,
                    estimatedTime: estimatedTime.toISOString()
                };
            }
        })
    );
    
    const coverage = successCount / path.length;
    
    let reason: Weather['reason'];
    if (totalApiError) {
        reason = 'api_error';
    } else if (coverage === 1) {
        reason = 'success';
    } else {
        reason = 'partial';
    }
    
    return {
        path: results,
        weatherAvailable: coverage > 0,
        coverage,
        reason
    };
}

// fetches cloud cover from Open-Meteo for a specific location and time
async function fetchCloudCover(
    latitude: number,
    longitude: number,
    dateTime: Date
): Promise<number> {
    
    const dateStr = dateTime.toISOString().split('T')[0];
    const hour = dateTime.getUTCHours();
    
    const url = new URL(OPEN_METEO_BASE);
    url.searchParams.append('latitude', latitude.toFixed(4));
    url.searchParams.append('longitude', longitude.toFixed(4));
    url.searchParams.append('hourly', 'cloud_cover');
    url.searchParams.append('start_date', dateStr);
    url.searchParams.append('end_date', dateStr);
    url.searchParams.append('timezone', 'UTC');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    try {
        const response = await fetch(url.toString(), { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`Open-Meteo API error: ${response.status}`);
        }
        
        const data = await response.json() as OpenMeteoResponse;
        
        const cloudCoverArray = data.hourly?.cloud_cover;
        
        if (!cloudCoverArray || cloudCoverArray.length === 0) {
            throw new Error('No cloud cover data in response');
        }
        
        const cloudCover = cloudCoverArray[hour];
        
        if (cloudCover === undefined || cloudCover === null) {
            throw new Error(`No cloud cover data for hour ${hour}`);
        }
        
        return cloudCover;
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('Weather lookup timed out');
        }
        
        throw error;
    }
}