import axios from 'axios';
import Cookies from 'js-cookie';
import { TokensEnum } from '../../@types';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get(TokensEnum.JWT);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
