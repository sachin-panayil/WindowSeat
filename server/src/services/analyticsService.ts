import { PostHog } from 'posthog-node';

let client: PostHog | null = null;

if (process.env.POSTHOG_API_KEY) {
    client = new PostHog(process.env.POSTHOG_API_KEY, {
        host: 'https://us.i.posthog.com',
        flushAt: 1,
        flushInterval: 0,
    });
}

export function captureEvent(event: string, properties: Record<string, unknown>): void {
    if (!client) return;
    client.capture({ distinctId: 'server', event, properties });
}
