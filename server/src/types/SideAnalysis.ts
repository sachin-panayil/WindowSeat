export interface SideAnalysis {
    landmarkCount: number;
    landmarks: Array<{
        name: string;
        distanceFromOrigin: number;
        cloudCover: number | null;
    }>;
    averageCloudCover: number | null;
}