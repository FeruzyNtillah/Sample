import { NextRequest, NextResponse } from 'next/server';
import { AUTH_TOKEN_KEY } from './lib/constants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookie
  const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;

  // Define protected routes (all routes under (dashboard) group)
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
    pathname === '/' ||
    pathname.startsWith('/jobs') ||
    pathname.startsWith('/imports') ||
    pathname.startsWith('/requests') ||
    pathname.startsWith('/reports') ||
    pathname.startsWith('/invoice-documents') ||
    pathname.startsWith('/po-documents') ||
    pathname.startsWith('/payment-notifications') ||
    pathname.startsWith('/status') ||
    pathname.startsWith('/dashboards') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/profile');

  // Define public routes
  const isPublicRoute = pathname === '/login';

  // If trying to access protected route without auth token, redirect to login
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated user tries to access login, redirect to dashboard
  if (isPublicRoute && authToken) {
    const dashboardUrl = new URL('/', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
