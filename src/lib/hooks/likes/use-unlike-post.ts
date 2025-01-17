import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePostLike } from './lib';

export const useUnlikePost = (postId: string, userId: string) => {
  const queryClient = useQueryClient();
  const unlikePostMutation = useMutation({
    mutationFn: () => Api.likes.unlikePost(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      const previousAllPostsData = queryClient.getQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) =>
        togglePostLike(postId, old, 'unlike'),
      );

      const previousAllPopularPostsData = queryClient.getQueryData({
        ...Api.posts.getAllPopularPostsInfinityQueryOptions().queryKey,
      });

      queryClient.setQueryData(Api.posts.getAllPopularPostsInfinityQueryOptions().queryKey, (old) =>
        togglePostLike(postId, old, 'unlike'),
      );

      const previousPostsByUserIdData = queryClient.getQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
      );

      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        (old) => togglePostLike(postId, old, 'unlike'),
      );

      const previousLikedPostsData = queryClient.getQueryData(
        Api.posts.getUserLikedPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getUserLikedPostsInfinityQueryOptions().queryKey, (old) =>
        togglePostLike(postId, old, 'unlike'),
      );

      const previousBookmarksData = queryClient.getQueryData(
        Api.bookmark.getUserBookmarksInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(
        Api.bookmark.getUserBookmarksInfinityQueryOptions().queryKey,
        (old) => togglePostLike(postId, old, 'unlike'),
      );

      return {
        previousAllPostsData,
        previousAllPopularPostsData,
        previousPostsByUserIdData,
        previousLikedPostsData,
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
        context?.previousPostsByUserIdData,
      );
      queryClient.invalidateQueries(Api.posts.getPostByIdQueryOptions(postId));
    },
    onSettled: () => {
      queryClient.invalidateQueries(Api.posts.getPostByIdQueryOptions(postId));
    },
  });

  return { unlikePost: unlikePostMutation.mutate, isPending: unlikePostMutation.isPending };
};
