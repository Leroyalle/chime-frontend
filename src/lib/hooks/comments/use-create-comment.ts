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
      const previousAllPostsData = queryClient.getQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) =>
        handlePostCommentAction(postId, old, 'create'),
      );

      const previousAllPopularPostsData = queryClient.getQueryData(
        Api.posts.getAllPopularPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getAllPopularPostsInfinityQueryOptions().queryKey, (old) =>
        handlePostCommentAction(postId, old, 'create'),
      );

      const previousUserPostsData = queryClient.getQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
      );

      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        (old) => handlePostCommentAction(postId, old, 'create'),
      );

      const previousBookmarksData = queryClient.getQueryData(
        Api.bookmark.getUserBookmarksInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(
        Api.bookmark.getUserBookmarksInfinityQueryOptions().queryKey,
        (old) => handlePostCommentAction(postId, old, 'create'),
      );

      return {
        previousAllPostsData,
        previousAllPopularPostsData,
        previousUserPostsData,
        previousBookmarksData,
      };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
        context?.previousAllPostsData,
      );
      queryClient.setQueryData(
        Api.posts.getAllPopularPostsInfinityQueryOptions().queryKey,
        context?.previousAllPopularPostsData,
      );
      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        context?.previousUserPostsData,
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
