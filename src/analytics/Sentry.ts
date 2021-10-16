import * as Sentry from '@sentry/react-native';

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
Sentry.init({
  dsn: '',
  environment: 'development',
  // debug: true,
  enableAutoSessionTracking: true,
  enableAutoPerformanceTracking: true,
  sessionTrackingIntervalMillis: 5000,
  integrations: [
    new Sentry.ReactNativeTracing({
      idleTimeout: 5000,
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
      routingInstrumentation,
      // ... other options
    }),
  ],
  tracesSampleRate: 1.0,
});
