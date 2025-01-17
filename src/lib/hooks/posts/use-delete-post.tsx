import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { handleDeletePost } from './lib';

export const useDeletePost = (userId: string, postId: string) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const deletePostMutation = useMutation({
    mutationFn: () => Api.posts.deletePost(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['posts'],
      });

      const previousAllPostsData = queryClient.getQueryData({
        ...Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      });

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) =>
        handleDeletePost(postId, old),
      );

      const previousAllPopularPostsData = queryClient.getQueryData({
        ...Api.posts.getAllPopularPostsInfinityQueryOptions().queryKey,
      });

      queryClient.setQueryData(Api.posts.getAllPopularPostsInfinityQueryOptions().queryKey, (old) =>
        handleDeletePost(postId, old),
      );

      const previousUserPostsData = queryClient.getQueryData({
        ...Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
      });

      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        (old) => handleDeletePost(postId, old),
      );

      return { previousAllPostsData, previousUserPostsData, previousAllPopularPostsData };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
        context?.previousAllPostsData,
      );
      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        context?.previousUserPostsData,
      );
    },

    onSuccess: () => {
      if (pathname.includes('post/')) {
        router.back();
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(Api.posts.getPostByIdQueryOptions(postId));
    },
  });

  return {
    deletePost: deletePostMutation.mutate,
    isPending: deletePostMutation.isPending,
    isError: deletePostMutation.isError,
  };
};
