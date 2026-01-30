export interface FlightError {
  message: string;
  code: string;
  retryable: boolean;
}