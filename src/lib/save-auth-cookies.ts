import { TAuthTokens } from '../../@types/auth';
import Cookies from 'js-cookie';

export const saveAuthCookies = async (tokens: TAuthTokens) => {
  Cookies.set('accessToken', tokens.accessToken, {
    // httpOnly: true,
    // sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  Cookies.set('refreshToken', tokens.refreshToken, {
    // httpOnly: true,
    // sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};
