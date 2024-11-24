import { splitApi } from './api';

export const followApi = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<void, { followingId: string }>({
      query: (id) => ({
        url: '/follow',
        method: 'POST',
        body: id,
      }),
    }),
    unFollowUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/unFollow/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useFollowUserMutation, useUnFollowUserMutation } = followApi;
export const {
  endpoints: { followUser, unFollowUser },
} = followApi;
