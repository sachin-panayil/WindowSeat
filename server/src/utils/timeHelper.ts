import { fromZonedTime } from 'date-fns-tz';

const CRUISE_SPEED_MPH = 500;

export function parseLocalDepartureToUtc(date: string, time: string, timezone: string): Date {
    const localDateTimeString = `${date}T${time}:00`;
    return fromZonedTime(localDateTimeString, timezone);
}

export function estimateTimeAtPoint(departureUtc: Date, distanceMiles: number): Date {
    const flightTimeHours = distanceMiles / CRUISE_SPEED_MPH;
    const flightTimeMs = flightTimeHours * 60 * 60 * 1000;
    return new Date(departureUtc.getTime() + flightTimeMs);
}