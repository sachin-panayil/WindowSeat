export interface Landmark {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    type: 'mountain' | 'canyon' | 'lake' | 'river' | 'geological' | 'city' | 'coastal' | 'desert' | 'island' | 'forest';
    description: string;
    viewingRange: number;
}