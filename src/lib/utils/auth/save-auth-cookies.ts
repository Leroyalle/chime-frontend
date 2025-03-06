import { TokensEnum } from '@/types';
import Cookies from 'js-cookie';

export const saveAuthCookies = async (token: string) => {
  Cookies.set(TokensEnum.JWT, token, {
    // httpOnly: true,
    // sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    expires: 1,
  });
};
