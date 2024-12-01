import { Post } from '@/@types/dto';
import { splitApi } from './api';

export const postApi = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    // TODO: добавить фото
    createPost: builder.mutation<Post, { postData: FormData }>({
      query: ({ postData }) => ({
        url: '/posts',
        method: 'POST',
        body: postData,
      }),
    }),
    getAllPosts: builder.query<Post[], { skip: number; take: number; replace?: boolean }>({
      query: ({ skip, take }) => ({
        url: `/posts?skip=${skip}&take=${take}`,
        method: 'GET',
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newPosts, { arg }) => {
        if (arg.replace) {
          return newPosts;
        }
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
  useLazyGetPostByIdQuery,
  useDeletePostMutation,
} = postApi;

export const {
  endpoints: { createPost, getAllPosts, getPostById, deletePost },
} = postApi;
