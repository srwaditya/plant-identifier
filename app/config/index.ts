export const config = {
  // App information
  appName: 'Plant Scanner',
  version: '1.0.0',
  author: 'Aditya',
  tutorial: 'Techaly',

  // API Configuration
  apiConfig: {
    baseUrl: 'https://generativelanguage.googleapis.com',
    version: 'v1beta',
    model: 'gemini-1.5-flash',
    maxRetries: 3,
    initialRetryDelay: 1000,
  },

  // UI Configuration
  ui: {
    maxImageSize: 5 * 1024 * 1024, // 5MB
    supportedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    animationDuration: 300,
  },

  // Privacy Settings
  privacy: {
    imageRetentionTime: 0, // Images are processed and immediately discarded
    useAnalytics: false,
    useCookies: false,
    secureConnection: true,
  }
};
