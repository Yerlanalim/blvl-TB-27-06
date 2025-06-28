import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { getBaseUrl } from './utils/get-base-url';
import { getRouteGroup } from './utils/middleware-config';

// Минимальный тип для middleware - избегаем импорта больших types
type MinimalUser = {
  userLevel: 'STANDARD' | 'ADMIN' | 'TRIAL' | 'FREE' | 'PREMIUM' | 'LIFETIME';
};

// Matcher configuration
export const config = {
  // Update matcher to exclude /api routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const referer = req.headers.get('referer');

  // Handle legacy redirect
  if (pathname === '/sign-up') {
    return NextResponse.redirect(new URL('/signup', req.url));
  }

  if (pathname === '/homepage' || pathname === '/home') {
    return NextResponse.rewrite(new URL('/', req.url));
  }

  // Get route group for current path
  const route = getRouteGroup(pathname);

  // If path isn't in any group, treat it as a marketing page
  if (!route) {
    return NextResponse.next();
  }

  // Get current user session
  const { user } = await updateSession(req); // BIZLEVEL: error временно не используется
  const isAuthenticated = !!user?.user?.id;
  // const isAuthError = !!AuthError; // BIZLEVEL: временно не используется

  // Handle different route types
  if (route.config.requiresAuth && !isAuthenticated) {
    // Redirect to login if auth is required but user isn't authenticated
    return NextResponse.redirect(
      new URL(`/login?redirectUrl=${encodeURIComponent(pathname)}`, req.url)
    );
  }

  // Special handling for admin routes
  if (route.group === 'admin' && isAuthenticated) {
    const response = await fetch(`${getBaseUrl()}/api/user/${user?.user?.id}`, {
      method: 'GET',
    });
    const userData: MinimalUser = await response.json();

    if (userData.userLevel !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  // Only redirect to dashboard if user directly accesses root URL without referer
  if (pathname === '/' && isAuthenticated && !referer) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  /**
   * This API route is protected: if the user's authentication session is missing,
   * the supabaseClient will return an "Auth session missing!" error.
   * Reference: https://github.com/supabase/auth-js/blob/master/src/GoTrueClient.ts
   *
   * Authorization logic specific to each route can be handled within the route itself,
   * allowing centralized management of protected api endpoints.
   * You don't need to define this for every route.
   * As the logic scales, maintaining it will become difficult.
   *
   * TODO:
   * Implement protection on the actual routes as necessary.
   * I haven't reviewed the business logic flow in detail.
   */
  // if (route.group === "api_protected" && isAuthError) {
  //   return new NextResponse(JSON.stringify({ error: AuthError.message }), {
  //     status: 401,
  //     headers: { "Content-Type": "application/json" },
  //   });
  // }

  return NextResponse.next();
}
