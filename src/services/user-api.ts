import { AxiosRequestHeaders } from 'axios';
import { TAuthTokens } from '../../@types/auth';
import { SendEmailResponse, User, UserDto, UserResponse } from '../../@types/newResponse';
import { ApiRouter } from './constants';
import { instance } from './instance';
import { queryOptions } from '@tanstack/react-query';

type TRegister = {
  email: string;
};

export const register = async (userData: TRegister): Promise<SendEmailResponse> => {
  return (await instance.post<SendEmailResponse>(ApiRouter.REGISTER, userData)).data;
};

export const verifyCode = async (data: {
  userId: number;
  code: string;
}): Promise<Omit<UserDto, 'password'>> => {
  return (await instance.post<Omit<UserDto, 'password'>>(ApiRouter.VERIFY, data)).data;
};

export const login = async (userData: Omit<TRegister, 'name'>): Promise<TAuthTokens> => {
  return (await instance.post<TAuthTokens>(`/login`, userData)).data;
};

export const current = async () => {
  return (await instance.get<Omit<User, 'password'>>(`/current`)).data;
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

export const updateUser = async ({ userData, id }: { userData: FormData; id: string }) => {
  return (await instance.put<Omit<User, 'password'>>(`${ApiRouter.USER}/${id}`, userData)).data;
};

export const refreshAccessToken = async (refreshToken: string): Promise<TAuthTokens | null> => {
  return (await instance.post<TAuthTokens | null>(`${ApiRouter.REFRESH}`, { refreshToken })).data;
};

export const getUserQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['user', id],
    queryFn: () => getUserById({ id }),
    refetchOnWindowFocus: true,
  });
};
