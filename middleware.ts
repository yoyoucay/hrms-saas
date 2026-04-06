import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // user is logged in
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/employees/:path*', '/attendance/:path*', '/payroll/:path*'],
};