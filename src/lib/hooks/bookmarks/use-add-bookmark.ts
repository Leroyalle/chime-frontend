import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleBookmark } from './lib';

export const useAddBookmark = (postId: string, userId: string) => {
  const queryClient = useQueryClient();
  const addToBookmarksMutation = useMutation({
    mutationFn: () => Api.bookmark.addBookmark(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['bookmark'] });

      const previousAllPostsData = queryClient.getQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) =>
        toggleBookmark(postId, old, 'add'),
      );

      const previousPostsByUserIdData = queryClient.getQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
      );

      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        (old) => toggleBookmark(postId, old, 'add'),
      );

      const previousLikedPostsData = queryClient.getQueryData(
        Api.posts.getUserLikedPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getUserLikedPostsInfinityQueryOptions().queryKey, (old) =>
        toggleBookmark(postId, old, 'add'),
      );

      return { previousAllPostsData, previousPostsByUserIdData, previousLikedPostsData };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
        context?.previousAllPostsData,
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
    addBookmark: addToBookmarksMutation.mutate,
    isPending: addToBookmarksMutation.isPending,
    isError: addToBookmarksMutation.isError,
  };
};
