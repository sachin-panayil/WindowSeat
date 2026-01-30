export interface APIError {
    error: string;
    code: string;
    message: string;
    retryable: boolean;
}

export function classifyError(error: Error): { status: number; body: APIError } {
    const message = error.message.toLowerCase();
    
    // User errors - bad input, not retryable
    if (message.includes('airport not found')) {
        return {
            status: 400,
            body: {
                error: 'Invalid airport',
                code: 'AIRPORT_NOT_FOUND',
                message: error.message,
                retryable: false
            }
        };
    }
    
    // Timeout errors - retryable
    if (message.includes('timed out')) {
        return {
            status: 503,
            body: {
                error: 'Service timeout',
                code: 'TIMEOUT',
                message: 'The request took too long. Please try again.',
                retryable: true
            }
        };
    }
    
    // AI service errors - retryable
    if (message.includes('ai recommendation service') || message.includes('openai')) {
        return {
            status: 503,
            body: {
                error: 'AI service unavailable',
                code: 'AI_UNAVAILABLE',
                message: 'Our recommendation engine is temporarily unavailable. Please try again.',
                retryable: true
            }
        };
    }
    
    // External API errors - likely retryable
    if (message.includes('service error') || message.includes('api error')) {
        return {
            status: 503,
            body: {
                error: 'External service error',
                code: 'SERVICE_ERROR',
                message: 'One of our data services is temporarily unavailable. Please try again.',
                retryable: true
            }
        };
    }
    
    // Default - unknown server error, not retryable
    return {
        status: 500,
        body: {
            error: 'Internal server error',
            code: 'INTERNAL_ERROR',
            message: 'Something went wrong. Please try again later.',
            retryable: false
        }
    };
}