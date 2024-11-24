import { User } from '@/@types/dto';
import { splitApi } from './api';

type TRegister = {
  email: string;
  password: string;
  name: string;
};

export const userApi = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<TRegister, TRegister>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),

    login: builder.mutation<{ token: string }, Omit<TRegister, 'name'>>({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),

    current: builder.query<User, void>({
      query: () => ({
        url: '/current',
        method: 'GET',
      }),
    }),

    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),

    updateUser: builder.mutation<User, { userData: FormData; id: string }>({
      query: ({ userData, id }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});
