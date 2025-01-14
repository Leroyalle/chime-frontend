import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('jwtToken')?.value;
  const response = NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  response.headers.set('Authorization', `Bearer ${token}`);

  return response;
}
export const config = {
  matcher: [
    '/((?!auth|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
