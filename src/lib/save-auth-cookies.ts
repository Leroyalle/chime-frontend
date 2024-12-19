import Cookies from 'js-cookie';

export const saveAuthCookies = async (token: string) => {
  Cookies.set('jwtToken', token, {
    // httpOnly: true,
    // sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};
