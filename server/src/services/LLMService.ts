import OpenAI from 'openai';
import type { LandmarkSummary, SeatRecommendation, FlightData } from "../../shared/types/flight.types";
import type { GeoPoint } from "../types/GeoPoint";
import type { SideAnalysis } from '../types/SideAnalysis';
import type { PromptData } from '../types/PromptData';
import { SYSTEM_PROMPT } from '../data/prompt';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: 15000
});

type BaseSeatRecommendation = Omit<SeatRecommendation, 'leftSide' | 'rightSide'>;

export async function generateRecommendation(
    landmarks: LandmarkSummary[],
    pathWithSun: GeoPoint[],
    weatherReason: string,
    flightData?: FlightData
): Promise<BaseSeatRecommendation> {
    
    const promptData = buildPromptData(landmarks, pathWithSun, weatherReason, flightData);
    console.log('Prompt Data:', JSON.stringify(promptData, null, 2));
    
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            response_format: { type: 'json_object' },
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: JSON.stringify(promptData, null, 2) }
            ],
            max_tokens: 1000,
            temperature: 0.6,
            seed: 67,
        });

        const content = response.choices[0].message.content;
        if (!content) {
            throw new Error('Empty response from OpenAI');
        }

        const parsed = JSON.parse(content);
        console.log('AI Response:', JSON.stringify(parsed, null, 2));
        return validateAndTransform(parsed, landmarks, weatherReason);
        
    } catch (error) {
        console.error('OpenAI API error:', error);
        throw new Error('AI recommendation service unavailable. Please try again.');
    }
}

function buildPromptData(
    landmarks: LandmarkSummary[],
    pathWithSun: GeoPoint[],
    weatherReason: string,
    flightData?: FlightData
): PromptData {
    
    const leftLandmarks = landmarks.filter(l => l.side === 'left');
    const rightLandmarks = landmarks.filter(l => l.side === 'right');
    
    // Calculate sun glare percentages
    const leftGlareCount = pathWithSun.filter(p => p.sunGlareSide === 'left').length;
    const rightGlareCount = pathWithSun.filter(p => p.sunGlareSide === 'right').length;
    const totalPoints = pathWithSun.length;
    
    return {
        flight: flightData ? {
            route: flightData.route,
            date: flightData.date,
            departureTime: flightData.departureTime,
            durationMinutes: flightData.durationMinutes
        } : null,
        leftSide: buildSideAnalysis(leftLandmarks),
        rightSide: buildSideAnalysis(rightLandmarks),
        sunGlareSummary: {
            leftGlarePercent: Math.round((leftGlareCount / totalPoints) * 100),
            rightGlarePercent: Math.round((rightGlareCount / totalPoints) * 100)
        },
        weatherConfidence: weatherReason === 'success' ? 'high' : 
                          weatherReason === 'partial' ? 'partial' : 'unavailable'
    };
}

function buildSideAnalysis(landmarks: LandmarkSummary[]): SideAnalysis {
    const cloudCovers = landmarks
        .map(l => l.cloudCover)
        .filter((c): c is number => c !== undefined);
    
    const avgCloud = cloudCovers.length > 0 
        ? Math.round(cloudCovers.reduce((a, b) => a + b, 0) / cloudCovers.length)
        : null;
    
    return {
        landmarkCount: landmarks.length,
        landmarks: landmarks.map(l => ({
            name: l.name,
            distanceFromOrigin: l.distanceFromOrigin,
            estimated: l.estimatedTime,
            cloudCover: l.cloudCover ?? null
        })),
        averageCloudCover: avgCloud
    };
}

function validateAndTransform(
    aiResponse: any,
    allLandmarks: LandmarkSummary[],
    weatherReason: string
): BaseSeatRecommendation {
    // Validate required fields
    if (!aiResponse.recommendedSeat || !['left', 'right'].includes(aiResponse.recommendedSeat)) {
        throw new Error('Invalid recommendedSeat');
    }
    
    const confidence = Math.min(10, Math.max(1, Math.round(aiResponse.confidence || 5)));
    const reasoning = aiResponse.reasoning || 'Unable to generate detailed reasoning.';
    
    // Map landmark names back to full LandmarkSummary objects
    const recommendedSide = aiResponse.recommendedSeat as 'left' | 'right';
    const sideLandmarks = allLandmarks.filter(l => l.side === recommendedSide);
    
    // If AI returned specific landmarks, preserve that order; otherwise use all from that side
    let selectedLandmarks: LandmarkSummary[];
    if (Array.isArray(aiResponse.topLandmarkNames) && aiResponse.topLandmarkNames.length > 0) {
        selectedLandmarks = aiResponse.topLandmarkNames
            .map((name: string) => sideLandmarks.find(l => l.name === name))
            .filter((l: LandmarkSummary | undefined): l is LandmarkSummary => l !== undefined)
            .slice(0, 10);
        
        // If AI returned names that don't match, fall back to side landmarks
        if (selectedLandmarks.length === 0) {
            selectedLandmarks = sideLandmarks.slice(0, 10);
        }
    } else {
        selectedLandmarks = sideLandmarks.slice(0, 10);
    }
    
    const weatherConfidence: SeatRecommendation['weatherConfidence'] = 
        weatherReason === 'success' ? 'high' :
        weatherReason === 'partial' ? 'partial' : 'unavailable';
    
    return {
        recommendedSeat: recommendedSide,
        confidence,
        reasoning,
        landmarks: selectedLandmarks,
        weatherConfidence
    };
}

// Fallback if OpenAI fails - simple heuristic
function fallbackRecommendation(
    landmarks: LandmarkSummary[],
    pathWithSun: GeoPoint[],
    weatherReason: string
): BaseSeatRecommendation {
    const leftLandmarks = landmarks.filter(l => l.side === 'left');
    const rightLandmarks = landmarks.filter(l => l.side === 'right');
    
    const recommendedSeat = leftLandmarks.length >= rightLandmarks.length ? 'left' : 'right';
    const winningLandmarks = recommendedSeat === 'left' ? leftLandmarks : rightLandmarks;
    
    const weatherConfidence: SeatRecommendation['weatherConfidence'] = 
        weatherReason === 'success' ? 'high' :
        weatherReason === 'partial' ? 'partial' : 'unavailable';
    
    return {
        recommendedSeat,
        confidence: 5,
        reasoning: `The ${recommendedSeat} side offers views of ${winningLandmarks.length} landmarks. AI-powered analysis temporarily unavailable.`,
        landmarks: winningLandmarks.slice(0, 10),
        weatherConfidence
    };
}