import { Post } from '@/@types/dto';
import { splitApi } from './api';

export const postApi = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    // TODO: добавить фото
    createPost: builder.mutation<Post, { content: string }>({
      query: (content) => ({
        url: '/posts',
        method: 'POST',
        body: content,
      }),
    }),
    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: 'posts',
        method: 'GET',
      }),
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `/posts${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useLazyGetAllPostsQuery,
  useCreatePostMutation,
  useGetPostByIdQuery,
  useDeletePostMutation,
} = postApi;

export const {
  endpoints: { createPost, getAllPosts, getPostById, deletePost },
} = postApi;
