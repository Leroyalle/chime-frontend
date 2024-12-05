import axios from 'axios';
import { User } from '../../@types/dto';
import { ApiRouter } from './constants';

type TRegister = {
  email: string;
  password: string;
  name: string;
};

export const register = async (userData: TRegister): Promise<Omit<User, 'password'>> => {
  return (await axios.post<Omit<User, 'password'>>(`/register`, userData)).data;
};

export const login = async (userData: Omit<TRegister, 'name'>) => {
  return (await axios.post<{ token: string }>(`/login`, userData)).data;
};

export const current = async () => {
  return (await axios.get<Omit<User, 'password'>>(`/current`)).data;
};

export const getUserById = async (id: string) => {
  return (await axios.get<Omit<User, 'password'>>(`${ApiRouter.USER}/${id}`)).data;
};

export const updateUser = async ({ userData, id }: { userData: FormData; id: string }) => {
  return (await axios.put<Omit<User, 'password'>>(`${ApiRouter.USER}/${id}`, userData)).data;
};
