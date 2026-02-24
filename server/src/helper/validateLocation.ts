export function validateLocation(loc: unknown, label: string): string | null {
    if (!loc || typeof loc !== 'object') return `${label} is required`;
    const l = loc as Record<string, unknown>;
    if (typeof l.name !== 'string' || l.name.trim() === '') return `${label} name is required`;
    if (typeof l.latitude !== 'number' || l.latitude < -90 || l.latitude > 90) return `${label} has invalid latitude`;
    if (typeof l.longitude !== 'number' || l.longitude < -180 || l.longitude > 180) return `${label} has invalid longitude`;
    if (typeof l.timezone !== 'string' || l.timezone.trim() === '') return `${label} timezone is required`;
    return null;
}