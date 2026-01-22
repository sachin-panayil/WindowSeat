import type { LandmarkSummary } from "../../../shared/types/flight.types";
import type { SeatRecommendation } from "../../../shared/types/flight.types";
import { getSunPositions } from "../utils/sunHelper";

// manual script to generate a test response
export function generateRecommendation(
    landmarks: LandmarkSummary[],
    pathWithSun: ReturnType<typeof getSunPositions>,
    weatherReason: string
): SeatRecommendation {
    
    let leftScore = 0;
    let rightScore = 0;

    const leftLandmarks = landmarks.filter(l => l.side === 'left');
    const rightLandmarks = landmarks.filter(l => l.side === 'right');

    for (const landmark of leftLandmarks) {
        const visibility = landmark.cloudCover !== undefined ? (100 - landmark.cloudCover) / 100 : 0.5;
        leftScore += visibility;
    }

    for (const landmark of rightLandmarks) {
        const visibility = landmark.cloudCover !== undefined ? (100 - landmark.cloudCover) / 100 : 0.5;
        rightScore += visibility;
    }

    const avgSunAzimuth = pathWithSun.reduce((sum, p) => sum + (p.sunAzimuth ?? 0), 0) / pathWithSun.length;
    
    if (avgSunAzimuth > 45 && avgSunAzimuth < 135) {
        rightScore *= 0.8; 
    } else if (avgSunAzimuth > 225 && avgSunAzimuth < 315) {
        leftScore *= 0.8; 
    }

    const recommendedSeat = leftScore >= rightScore ? 'left' : 'right';
    const winningLandmarks = recommendedSeat === 'left' ? leftLandmarks : rightLandmarks;
    
    const scoreDiff = Math.abs(leftScore - rightScore);
    const totalLandmarks = landmarks.length;
    let confidence = Math.min(10, Math.round(5 + scoreDiff * 2 + Math.min(totalLandmarks / 10, 3)));

    if (weatherReason === 'date_out_of_range' || weatherReason === 'api_error') {
        confidence = Math.max(1, confidence - 3);
    } else if (weatherReason === 'partial') {
        confidence = Math.max(1, confidence - 1);
    }

    const weatherConfidence: SeatRecommendation['weatherConfidence'] = 
        weatherReason === 'success' ? 'high' :
        weatherReason === 'partial' ? 'partial' : 'unavailable';

    const topLandmarks = winningLandmarks.slice(0, 3).map(l => l.name).join(', ');
    const reasoning = `The ${recommendedSeat} side offers views of ${winningLandmarks.length} landmarks including ${topLandmarks || 'various points of interest'}. ` +
        (weatherConfidence === 'high' 
            ? 'Weather conditions look favorable for visibility.' 
            : weatherConfidence === 'partial'
            ? 'Weather data is partially available; conditions may vary.'
            : 'Weather forecast not yet available for this date.');

    return {
        recommendedSeat,
        confidence,
        reasoning,
        landmarks: winningLandmarks.slice(0, 10),
        weatherConfidence
    };
}