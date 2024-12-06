import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUnlikePost = (postId: string) => {
  const queryClient = useQueryClient();
  const unlikePostMutation = useMutation({
    mutationFn: () => Api.likes.unlikePost(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousData = queryClient.getQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) => {
        if (!old) {
          return undefined;
        }
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((post) =>
              post.id === postId
                ? { ...post, isLiked: false, likesCount: post.likesCount - 1 }
                : post,
            ),
          })),
        };
      });
      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['todos'], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(Api.posts.getPostByIdQueryOptions(postId));
    },
  });

  return { unlikePost: unlikePostMutation.mutate, isPending: unlikePostMutation.isPending };
};
