import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleBookmark } from './lib';

export const useRemoveBookmark = (postId: string, userId: string) => {
  const queryClient = useQueryClient();
  const addToBookmarksMutation = useMutation({
    mutationFn: () => Api.bookmark.removeBookmark(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['bookmark'] });

      const previousAllPostsData = queryClient.getQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) =>
        toggleBookmark(postId, old, 'remove'),
      );

      const previousAllPopularPostsData = queryClient.getQueryData(
        Api.posts.getAllPopularPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getAllPopularPostsInfinityQueryOptions().queryKey, (old) =>
        toggleBookmark(postId, old, 'remove'),
      );

      const previousPostsByUserIdData = queryClient.getQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
      );

      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        (old) => toggleBookmark(postId, old, 'remove'),
      );

      const previousLikedPostsData = queryClient.getQueryData(
        Api.posts.getUserLikedPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getUserLikedPostsInfinityQueryOptions().queryKey, (old) =>
        toggleBookmark(postId, old, 'remove'),
      );

      const previousBookmarksData = queryClient.getQueryData(
        Api.bookmark.getUserBookmarksInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(
        Api.bookmark.getUserBookmarksInfinityQueryOptions().queryKey,
        (old) => toggleBookmark(postId, old, 'remove'),
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
      queryClient.setQueryData(
        Api.posts.getUserLikedPostsInfinityQueryOptions().queryKey,
        context?.previousLikedPostsData,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(Api.posts.getPostByIdQueryOptions(postId));
    },
  });

  return {
    removeBookmark: addToBookmarksMutation.mutate,
    isPending: addToBookmarksMutation.isPending,
    isError: addToBookmarksMutation.isError,
  };
};
