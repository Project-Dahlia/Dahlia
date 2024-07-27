import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const unauthorizedRoutes = ['/api/auth/login', '/api/auth/register'];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_JWT_SECRET
  });

  console.log('this is the token', token);

  if (
    !token &&
    !unauthorizedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    )
  ) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
