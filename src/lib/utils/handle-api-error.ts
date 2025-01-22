import { notFound, redirect } from 'next/navigation';
import { AxiosError } from 'axios';
import { RoutesEnum, TokensEnum } from '../../types';
import Cookies from 'js-cookie';

export function handleApiError(error: AxiosError) {
  console.log(error);
  if (error.response?.status === 401 || error.response?.status === 403) {
    Cookies.remove(TokensEnum.JWT);
    return redirect(RoutesEnum.AUTH);
  }
  return notFound();
}
