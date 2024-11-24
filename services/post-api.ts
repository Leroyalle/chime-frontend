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
    getAllPosts: builder.query<Post[], { skip: number; take: number }>({
      query: ({ skip, take }) => ({
        url: `/posts?skip=${skip}&take=${take}`,
        method: 'GET',
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newPosts) => {
        currentCache.push(...newPosts);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.skip !== previousArg?.skip;
      },
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
