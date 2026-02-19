export function validateEnv(): void {
    const required = ['OPENAI_API_KEY'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        console.error('Missing required environment variables:');
        missing.forEach(key => console.error(`   - ${key}`));
        console.error('\nPlease check your .env file or environment configuration.');
        process.exit(1);
    }
    
    if (!process.env.POSTHOG_API_KEY) {
        console.warn('Warning: POSTHOG_API_KEY is not set — analytics will be disabled.');
    }

    console.log('Environment variables validated!');
}