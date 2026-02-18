import airportData from '../data/airports.json';

export interface Airport {
  iata: string;
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  timezone: string;
  size: 'large' | 'medium' | 'small';
}

export const US_AIRPORTS: Airport[] = airportData as Airport[];
