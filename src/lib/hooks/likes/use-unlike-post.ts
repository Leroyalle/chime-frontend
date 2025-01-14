import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePostLike } from './lib';

export const useUnlikePost = (postId: string, userId: string) => {
  const queryClient = useQueryClient();
  const unlikePostMutation = useMutation({
    mutationFn: () => Api.likes.unlikePost(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const previousData = queryClient.getQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) => {
        return togglePostLike(postId, old, 'unlike');
      });

      const previousPostsByUserIdData = queryClient.getQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
      );

      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        (old) => {
          return togglePostLike(postId, old, 'unlike');
        },
      );

      const previousLikedPostsData = queryClient.getQueryData(
        Api.posts.getUserLikedPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(
        Api.posts.getUserLikedPostsInfinityQueryOptions().queryKey,
        (old) => {
          return togglePostLike(postId, old, 'unlike');
        },
      );

      return { previousData, previousPostsByUserIdData, previousLikedPostsData };
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
      queryClient.invalidateQueries(Api.posts.getPostByIdQueryOptions(postId));
    },
    onSettled: () => {
      queryClient.invalidateQueries(Api.posts.getPostByIdQueryOptions(postId));
    },
  });

  return { unlikePost: unlikePostMutation.mutate, isPending: unlikePostMutation.isPending };
};
