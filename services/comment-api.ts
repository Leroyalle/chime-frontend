import { Comment } from '@/@types/dto';
import { splitApi } from './api';

export const commentApi = splitApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<Comment, { content: string; postId: string }>({
      query: (commentData) => ({
        url: '/comments',
        method: 'POST',
        body: commentData,
      }),
    }),
    deleteComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } = commentApi;
export const {
  endpoints: { createComment, deleteComment },
} = commentApi;
