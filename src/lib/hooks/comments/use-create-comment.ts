import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handlePostCommentAction } from './lib';

export const useCreateComment = (postId: string, userId: string) => {
  const queryClient = useQueryClient();
  const createCommentMutation = useMutation({
    mutationFn: Api.comments.createComment,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['posts'],
      });
      const previousData = queryClient.getQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) => {
        return handlePostCommentAction(postId, old, 'create');
      });

      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        (old) => {
          return handlePostCommentAction(postId, old, 'create');
        },
      );

      return { previousData };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
        context?.previousData,
      );
      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        context?.previousData,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries(Api.posts.getPostByIdQueryOptions(postId));
      queryClient.resetQueries({ queryKey: ['comments', 'list', userId] });
    },
  });

  return {
    createComment: createCommentMutation.mutate,
    isPending: createCommentMutation.isPending,
  };
};
