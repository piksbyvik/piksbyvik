import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if coming soon mode is enabled
  const isComingSoonMode = process.env.COMING_SOON_MODE === 'true';
  
  if (!isComingSoonMode) {
    return NextResponse.next();
  }
  const pathname = request.nextUrl.pathname;
    // Allow access to contact page and essential routes only
  const allowedPaths = [
    '/contact',
    '/api',
    '/_next',
    '/favicon.ico',
    '/images',
    '/studio', // Allow Sanity Studio access
    '/calendar-icon.svg',
    '/mail-icon.svg',
    '/piksbyvik-logo.svg',
    '/logo-light-navbar.svg',
    '/grain.webp',
    // Allow all static assets
    '/.*\\.(svg|png|jpg|jpeg|gif|webp|ico|css|js)$'
  ];
    // Check if the current path is allowed
  const isAllowedPath = allowedPaths.some(path => {
    if (path === '/.*\\.(svg|png|jpg|jpeg|gif|webp|ico|css|js)$') {
      // Handle static assets regex pattern
      return /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js)$/i.test(pathname);
    }
    return pathname.startsWith(path);
  });
  
  if (!isAllowedPath) {
    // Redirect to contact page
    return NextResponse.redirect(new URL('/contact', request.url));
  }
  
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};