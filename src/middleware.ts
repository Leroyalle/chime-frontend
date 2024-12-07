import { NextRequest, NextResponse } from 'next/server';
import { Api } from './services/api-client';

export default async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  try {
    const res = await Api.users.refreshAccessToken(refreshToken);

    if (!res?.accessToken) {
      return NextResponse.redirect(new URL('/auth', req.url));
    }

    const response = NextResponse.next();
    response.cookies.set('accessToken', res.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('[MIDDLEWARE] Ошибка при обновлении токена:', error);
    return NextResponse.redirect(new URL('/auth', req.url));
  }
}
export const config = {
  matcher: [
    '/((?!auth|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
