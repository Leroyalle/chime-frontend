import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePostLike } from './lib';

export const useLikePost = (postId: string, userId: string) => {
  const queryClient = useQueryClient();

  const likePost = useMutation({
    mutationFn: () => Api.likes.likePost({ postId }),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['posts'],
      });

      const previousAllPostsData = queryClient.getQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) => {
        return togglePostLike(postId, old, 'like');
      });

      const previousPostsByUserIdData = queryClient.getQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
      );

      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        (old) => {
          return togglePostLike(postId, old, 'like');
        },
      );

      const previousLikedPostsData = queryClient.getQueryData(
        Api.posts.getUserLikedPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(
        Api.posts.getUserLikedPostsInfinityQueryOptions().queryKey,
        (old) => {
          return togglePostLike(postId, old, 'like');
        },
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
    likePost: likePost.mutate,
    isPending: likePost.isPending,
  };
};
