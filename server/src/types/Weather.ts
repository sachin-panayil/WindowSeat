import { GeoPoint } from "./GeoPoint";

export interface Weather {
    path: GeoPoint[];
    weatherAvailable: boolean;
    coverage: number;             
    reason: 'success' | 'date_out_of_range' | 'api_error' | 'partial';
}