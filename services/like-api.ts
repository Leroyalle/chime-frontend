import { Like } from '@/@types/dto';
import { splitApi } from './api';

export const likeApi = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    createLike: builder.mutation<Like, { postId: string }>({
      query: (id) => ({
        url: '/likes',
        method: 'POST',
        body: id,
      }),
    }),

    deleteLike: builder.mutation<void, string>({
      query: (id) => ({
        url: `/likes${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});
