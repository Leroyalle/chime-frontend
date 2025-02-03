import { AxiosRequestHeaders } from 'axios';
import { SendEmailResponse, User, UserDto, UserResponse, TAuthTokens } from '@/types';
import { ApiRouter } from './constants';
import { instance } from './instance';
import { queryOptions } from '@tanstack/react-query';

type TRegister = {
  name: string;
  email: string;
  password: string;
};

export const register = async (userData: TRegister): Promise<SendEmailResponse> => {
  return (await instance.post<SendEmailResponse>(ApiRouter.REGISTER, userData)).data;
};

export const verifyCode = async (data: {
  userId: string;
  code: string;
}): Promise<Omit<UserDto, 'password'>> => {
  return (await instance.post<Omit<UserDto, 'password'>>(ApiRouter.VERIFY, data)).data;
};

export const login = async (userData: Omit<TRegister, 'name'>): Promise<TAuthTokens> => {
  return (await instance.post<TAuthTokens>(ApiRouter.LOGIN, userData)).data;
};

export const current = async (headers?: AxiosRequestHeaders): Promise<UserResponse> => {
  return (await instance.get<UserResponse>(ApiRouter.ME, { headers })).data;
};

export const getUserById = async ({
  id,
  headers,
}: {
  id: string;
  headers?: AxiosRequestHeaders;
}) => {
  return (await instance.get<UserResponse>(`${ApiRouter.USER}/${id}`, { headers })).data;
};

export const updateUser = async (userData: FormData): Promise<User> => {
  return (await instance.patch<User>(ApiRouter.ME, userData)).data;
};

export const refreshAccessToken = async (refreshToken: string): Promise<TAuthTokens | null> => {
  return (await instance.post<TAuthTokens | null>(`${ApiRouter.REFRESH}`, { refreshToken })).data;
};

export const getMeQueryOptions = () => {
  return queryOptions({
    queryKey: ['me'],
    queryFn: () => current(),
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
    gcTime: Infinity,
  });
};

export const getUserQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['user', id],
    queryFn: () => getUserById({ id }),
    refetchOnWindowFocus: false,
    retry: false,
  });
};
