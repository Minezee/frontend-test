import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const requestedUrl = req.nextUrl;

  if (token && requestedUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', requestedUrl.origin));
  }

  if (!token && requestedUrl.pathname === '/cart') {
    return NextResponse.redirect(new URL('/login', requestedUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/cart'],
};
