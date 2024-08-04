import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const unauthorizedRoutes = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/callback/google',
  '/api/auth/callback/credentials'
];

export async function middleware(request: NextRequest) {
  // Check if the current route is in the unauthorizedRoutes list
  if (
    unauthorizedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    )
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_JWT_SECRET
  });

  console.log('this is the token', token);

  if (!token) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  // Allow authenticated users to access all routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
