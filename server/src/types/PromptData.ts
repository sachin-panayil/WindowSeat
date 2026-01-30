import { SideAnalysis } from "./SideAnalysis";

export interface PromptData {
    flight: {
        route: string;
        date: string;
        departureTime: string;
        durationMinutes: number;
    } | null;
    leftSide: SideAnalysis;
    rightSide: SideAnalysis;
    sunGlareSummary: {
        leftGlarePercent: number;
        rightGlarePercent: number;
    };
    weatherConfidence: string;
}