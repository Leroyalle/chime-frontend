import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const jwtToken = req.cookies.get('jwtToken')?.value;

  if (!jwtToken) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!auth|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
