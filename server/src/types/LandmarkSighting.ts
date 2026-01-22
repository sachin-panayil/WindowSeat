import { Landmark } from "./Landmark";

export interface LandmarkSighting {
    landmark: Landmark;
    side: 'left' | 'right';
    distanceFromOrigin: number;
    distanceFromPath: number;
}