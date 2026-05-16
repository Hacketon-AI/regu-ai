import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Public routes that don't require authentication
const publicRoutes = ["/login", "/register"];

// API routes that should be public
const publicApiRoutes = ["/api/auth"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Check if the route is a public API route
  const isPublicApiRoute = publicApiRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the route is a public page
  const isPublicRoute = publicRoutes.includes(pathname);

  // Allow public API routes
  if (isPublicApiRoute) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from login/register pages
  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect unauthenticated users to login for protected routes
  if (!isLoggedIn && !isPublicRoute) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

// Use Node.js runtime for middleware (required for Prisma)
export const runtime = "nodejs";

// Made with Bob