// Define the route groups and their auth requirements
export const routeConfig = {
  // Marketing site routes (no auth required)
  marketing: {
    patterns: ['/', '/about', '/pricing', '/contact'],
    requiresAuth: false,
  },
  // Auth-related routes (no auth required)
  auth: {
    patterns: ['/login', '/signup', '/forgot-password', '/update-password', '/verify-email'],
    requiresAuth: false,
  },
  // Dashboard routes (auth required)
  dashboard: {
    patterns: [
      '/dashboard',
      '/statistics',
      '/settings',
      '/statistics/reports',
      '/coding-challenges/custom',
      '/roadmaps',
    ],
    requiresAuth: true,
  },
  // API routes to be protected (auth required)
  api_protected: {
    patterns: ['/api/upload', '/api/cron'],
    requiresAuth: true,
  },
};

// Helper function to check if path matches any pattern
export const getRouteGroup = (path: string) => {
  for (const [group, config] of Object.entries(routeConfig)) {
    if (
      config.patterns.some((pattern) => {
        if (pattern.endsWith('/*')) {
          // For wildcard patterns, check if the path starts with the pattern prefix
          const prefix = pattern.slice(0, -2);
          return path === prefix || path.startsWith(prefix + '/');
        }
        // For exact patterns, check for exact match
        return path === pattern;
      })
    ) {
      return { group, config };
    }
  }
  return null;
}; 